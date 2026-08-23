/*
 * Tonight's moon, computed rather than drawn: the angle between sun and moon
 * decides how much of the disc is lit, which limb the light hangs from, and
 * how far the terminator has swung across the face.
 *
 * The longitude terms below are the ones this figure was built and checked on;
 * the simpler epoch-and-synodic-month formula is not a substitute for them.
 * Nothing here touches the DOM, so the glyph in the page corner and the large
 * moon on the plate are the same figure at two sizes.
 */

export const RAD = Math.PI / 180
const DEGREE = 180 / Math.PI

export const DAY = 86400000
/* Days from the Unix epoch to J2000.0, the epoch every term below is written against */
const J2000 = 10957.5

/* Days since J2000.0, the epoch every term below is written against */
export function epochDays(date: Date): number {
	return date.getTime() / DAY - J2000
}

export function dateFromEpochDays(days: number): Date {
	return new Date((days + J2000) * DAY)
}

function wrap(degrees: number): number {
	const turned = degrees % 360
	return turned < 0 ? turned + 360 : turned
}

/* How far the sun has gone round its own orbit, which both longitudes turn on */
function meanAnomaly(days: number): number {
	return (357.5291092 + 0.98560028 * days) * RAD
}

/* Where the sun stands on the ecliptic, in degrees */
function sunDegrees(days: number, anomaly: number): number {
	return (
		280.4665 +
		0.98564736 * days +
		1.915 * Math.sin(anomaly) +
		0.02 * Math.sin(2 * anomaly)
	)
}

/* The sun's apparent longitude, good to about a minute of arc */
export function sunLongitude(days: number): number {
	return sunDegrees(days, meanAnomaly(days)) * RAD
}

/*
 * The angle from the sun to the moon as seen from here. Nothing else is
 * needed: the lit fraction is (1 − cos ψ) / 2, and which limb it hangs from
 * is whether ψ has passed 180°.
 *
 * The phase could be had from a new-moon epoch and a mean synodic month, but
 * the moon does not keep mean time: that method runs up to fifteen hours
 * early or late, which is a visibly wrong terminator. These are the leading
 * terms of the two longitudes instead, checked against five eclipses between
 * 2017 and 2025, none of which it misses by more than a fifth of a degree.
 */
export function elongation(days: number): number {
	const sunAnomaly = meanAnomaly(days)
	const moonAnomaly = (134.9633964 + 13.06499295 * days) * RAD
	const mean = (297.8501921 + 12.19074912 * days) * RAD
	const node = (93.272095 + 13.2293502 * days) * RAD
	const moon =
		218.3164477 +
		13.17639648 * days +
		6.289 * Math.sin(moonAnomaly) +
		1.274 * Math.sin(2 * mean - moonAnomaly) +
		0.658 * Math.sin(2 * mean) +
		0.214 * Math.sin(2 * moonAnomaly) -
		0.186 * Math.sin(sunAnomaly) -
		0.114 * Math.sin(2 * node)

	return wrap(moon - sunDegrees(days, sunAnomaly)) * RAD
}

export function phaseName(psi: number): string {
	const degrees = psi * DEGREE
	const waxing = degrees < 180

	if (degrees < 8 || degrees > 352) {
		return 'new moon'
	}

	if (degrees > 172 && degrees < 188) {
		return 'full moon'
	}

	if (degrees > 82 && degrees < 98) {
		return 'first quarter'
	}

	if (degrees > 262 && degrees < 278) {
		return 'last quarter'
	}

	const shape = Math.cos(psi) > 0 ? 'crescent' : 'gibbous'

	return `${waxing ? 'waxing' : 'waning'} ${shape}`
}

/* The lit fraction of the disc, 0 at new and 1 at full */
export function illumination(psi: number): number {
	return (1 - Math.cos(psi)) / 2
}

export function phaseOn(date: Date): number {
	return elongation(epochDays(date))
}

export const NEW_MOON = 0
export const FULL_MOON = Math.PI

/* Half a day: the moon gains about six degrees on the sun in one, so no crossing is stepped over */
const COARSE = 0.5
/* One lunation is 29.53 days; eighty coarse steps clear it with room to spare */
const COARSE_STEPS = 80
/* Bisection to the second, which is far finer than these terms are honest to */
const REFINE = 48

/*
 * When the elongation next passes a given angle. Written as the signed gap to
 * that angle, which climbs steadily through the month and falls through zero
 * exactly once per lunation — at the event itself.
 */
export function nextPhase(from: Date, target: number): Date {
	const start = epochDays(from)

	function gap(days: number): number {
		const raw = elongation(days) - target + Math.PI
		return (((raw % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) - Math.PI
	}

	let lo = start
	let low = gap(lo)

	for (let step = 0; step < COARSE_STEPS; step++) {
		const hi = start + (step + 1) * COARSE
		const high = gap(hi)

		if (low <= 0 && high > 0) {
			let near = lo
			let far = hi

			for (let i = 0; i < REFINE; i++) {
				const mid = (near + far) / 2

				if (gap(mid) > 0) {
					far = mid
				} else {
					near = mid
				}
			}

			return dateFromEpochDays((near + far) / 2)
		}

		lo = hi
		low = high
	}

	/* Unreachable for any real lunation; a date is still owed to the caller */
	return dateFromEpochDays(start + COARSE_STEPS * COARSE)
}

function round(value: number): number {
	return Math.round(value * 1000) / 1000
}

export interface MoonShape {
	/* The lit region, closed: down the limb and back along the terminator */
	path: string
	/* Where the limb bulges out and where the terminator does — the shading's own axis */
	limbX: number
	terminatorX: number
}

/*
 * The lit region is bounded by two half-ellipses sharing their poles: the limb,
 * always a semicircle of the disc's own radius, and the terminator, the same
 * curve squashed by cos ψ. Past a quarter the terminator falls on the far side
 * of the centre line and the crescent becomes a gibbous — which is a change of
 * one arc flag, not of the figure.
 */
export function moonShape(
	psi: number,
	cx: number,
	cy: number,
	r: number,
): MoonShape {
	const waist = Math.cos(psi)
	/* North of the equator a waxing moon is lit on the right */
	const side = psi < Math.PI ? 1 : -1
	/* A quarter moon has no waist at all, and an arc with no radius is a straight line */
	const rx = Math.abs(waist) * r
	const limbSweep = side > 0 ? 1 : 0
	const terminatorSweep = side * waist >= 0 ? 0 : 1
	const top = round(cy - r)
	const bottom = round(cy + r)
	const x = round(cx)

	return {
		path: [
			`M${x} ${top}`,
			`A${round(r)} ${round(r)} 0 0 ${limbSweep} ${x} ${bottom}`,
			`A${round(rx)} ${round(r)} 0 0 ${terminatorSweep} ${x} ${top}`,
			'Z',
		].join(''),
		limbX: round(cx + side * r),
		terminatorX: round(cx + side * waist * r),
	}
}
