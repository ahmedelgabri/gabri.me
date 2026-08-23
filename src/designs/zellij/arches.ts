/*
 * A portfolio of six arches, one struck at random over each post title. Every
 * one is a real construction rather than a traced silhouette, and all six share
 * a single frame so they can stand in for one another: a 720×210 band cropped
 * to the crown, with the springing line below the visible area wherever the
 * form allows it; a crown that lands on the same apex; a double rule whose
 * inner line is a true parallel of the outer at 12 units, offset along the
 * normal rather than by subtracting from whatever radius happens to be to
 * hand; and impost hairlines that run from the frame edges to the point where
 * the outer line leaves it.
 */

export const ARCH_WIDTH = 720
export const ARCH_HEIGHT = 210
export const IMPOST_Y = ARCH_HEIGHT - 1.5

const MID = ARCH_WIDTH / 2
/* Every crown reaches this line, so the six share one silhouette height */
const APEX_Y = 20
/* Half the span at the springing — the family's common footprint */
const HALF_SPAN = 270
const GAP = 12

type Point = readonly [number, number]

function round(n: number): number {
	return Math.round(n * 100) / 100
}

function fmt([x, y]: Point): string {
	return `${round(x)} ${round(y)}`
}

function mirror([x, y]: Point): Point {
	return [2 * MID - x, y]
}

function sub(a: Point, b: Point): Point {
	return [a[0] - b[0], a[1] - b[1]]
}

function add(a: Point, b: Point): Point {
	return [a[0] + b[0], a[1] + b[1]]
}

function scale(a: Point, k: number): Point {
	return [a[0] * k, a[1] * k]
}

function len(a: Point): number {
	return Math.hypot(a[0], a[1])
}

function unit(a: Point): Point {
	return scale(a, 1 / len(a))
}

function dot(a: Point, b: Point): number {
	return a[0] * b[0] + a[1] * b[1]
}

/* Quarter turn clockwise on screen, where y runs down */
function perp([x, y]: Point): Point {
	return [-y, x]
}

/* A point on the circle at angle a measured from the axis, y running down */
function polar(centre: Point, r: number, a: number): Point {
	return [centre[0] + r * Math.sin(a), centre[1] - r * Math.cos(a)]
}

interface Segment {
	to: Point
	/* A straight run when the radius is zero */
	r: number
	sweep: 0 | 1
	large: 0 | 1
}

function segment(
	to: Point,
	r = 0,
	sweep: 0 | 1 = 1,
	large: 0 | 1 = 0,
): Segment {
	return {to, r, sweep, large}
}

function draw({to, r, sweep, large}: Segment): string {
	return r === 0
		? `L ${fmt(to)}`
		: `A ${round(r)} ${round(r)} 0 ${large} ${sweep} ${fmt(to)}`
}

/*
 * Every arch here is symmetric about the axis, so only the left half is
 * constructed. The right half retraces it mirrored and in reverse, which keeps
 * the sweep flags: the mirror reverses each arc's handedness and running it
 * backwards reverses it again.
 */
function symmetricPath(start: Point, half: Segment[]): string {
	const parts = [`M ${fmt(start)}`, ...half.map(draw)]

	for (let i = half.length - 1; i >= 0; i--) {
		const from = i === 0 ? start : half[i - 1]!.to
		parts.push(draw({...half[i]!, to: mirror(from)}))
	}

	return parts.join(' ')
}

export interface ArchPaths {
	outer: string
	inner: string
	/* Where the outer line leaves the frame; the imposts run in to meet it */
	impostX: number
}

/* One link per caption: the arch type's article where Wikipedia has a real
 * one, otherwise the building — Keel_arch redirects to Four-centred_arch,
 * which would mislead. All targets verified canonical. */
export interface ArchCaption {
	pre: string
	linkText: string
	href: string
	post: string
}

export interface Arch {
	id: string
	name: string
	caption: ArchCaption
	paths: ArchPaths
}

/*
 * The two-centred drop arch. Each half is a circular arc whose centre sits on
 * the springing line, offset from the axis toward the opposite side; the offset
 * makes the arcs meet at the apex in a true point, which requires rise >
 * half-span.
 */
function dropArch(): ArchPaths {
	const springY = 320
	const rise = springY - APEX_Y
	const offset = (rise * rise - HALF_SPAN * HALF_SPAN) / (2 * HALF_SPAN)
	const outerR = HALF_SPAN + offset
	const innerR = outerR - GAP
	/* At the apex the normal is vertical, so the parallel line drops by the gap */
	const innerApexY = springY - Math.sqrt(innerR ** 2 - offset ** 2)

	return {
		outer: symmetricPath(
			[MID - HALF_SPAN, springY],
			[segment([MID, APEX_Y], outerR)],
		),
		inner: symmetricPath(
			[MID + offset - innerR, springY],
			[segment([MID, innerApexY], innerR)],
		),
		impostX: round(
			MID + offset - Math.sqrt(outerR ** 2 - (springY - IMPOST_Y) ** 2),
		),
	}
}

/*
 * The rounded horseshoe. One circle, stilted: its centre stands a third of the
 * radius above the springing line, so the arc passes its widest point — the
 * full diameter — before it turns back in to the imposts, and the span at the
 * springing is only √(8)/3 = 0.943 of that diameter. The band crops the crown,
 * where the horseshoe reads as a full round dome against the drop arch's point.
 */
function horseshoeArch(): ArchPaths {
	const stiltRatio = 1 / 3
	const outerR = HALF_SPAN / Math.sqrt(1 - stiltRatio ** 2)
	const stilt = outerR * stiltRatio
	const centre: Point = [MID, APEX_Y + outerR]
	const springY = centre[1] + stilt
	const innerR = outerR - GAP

	return {
		outer: symmetricPath(
			[MID - HALF_SPAN, springY],
			[segment([MID, APEX_Y], outerR)],
		),
		inner: symmetricPath(
			[MID - Math.sqrt(innerR ** 2 - stilt ** 2), springY],
			[segment([MID, APEX_Y + GAP], innerR)],
		),
		impostX: round(MID - Math.sqrt(outerR ** 2 - (IMPOST_Y - centre[1]) ** 2)),
	}
}

/*
 * The depressed four-centred arch. The haunch centres sit on the springing line
 * at the quarter points of the span with a quarter span for radius, so each
 * haunch leaves its impost vertically. Each crown arc is struck from a centre
 * below the springing line on the far side of the axis, and two conditions fix
 * it: it must pass through the apex, and it must be internally tangent to the
 * haunch — centres |R − r| apart, which puts the join on the line through both
 * centres and hands the two arcs a common tangent there. That leaves one free
 * choice, taken here as the tilt of the tangent at the apex: the arch's point.
 */
function fourCentredArch(): ArchPaths {
	/* Low and wide enough to stand whole in the band, springing on the impost line */
	const springY = IMPOST_Y
	const rise = springY - APEX_Y
	const haunchR = HALF_SPAN / 2
	const apexTilt = (6 * Math.PI) / 180
	/* Horizontal run from the haunch centre to the axis */
	const reach = HALF_SPAN - haunchR
	const crownR =
		(reach ** 2 + rise ** 2 - haunchR ** 2) /
		(2 * (Math.cos(apexTilt) * rise - Math.sin(apexTilt) * reach - haunchR))
	const haunchC: Point = [MID - reach, springY]
	/* Below the springing line and across the axis, so the left arc reaches over */
	const crownC: Point = [
		MID + crownR * Math.sin(apexTilt),
		APEX_Y + crownR * Math.cos(apexTilt),
	]
	const join = add(crownC, scale(unit(sub(haunchC, crownC)), crownR))
	const innerJoin = add(haunchC, scale(unit(sub(join, haunchC)), haunchR - GAP))

	return {
		outer: symmetricPath(
			[MID - HALF_SPAN, springY],
			[segment(join, haunchR), segment([MID, APEX_Y], crownR)],
		),
		inner: symmetricPath(
			[MID - HALF_SPAN + GAP, springY],
			[
				segment(innerJoin, haunchR - GAP),
				segment(
					[
						MID,
						crownC[1] - Math.sqrt((crownR - GAP) ** 2 - (crownC[0] - MID) ** 2),
					],
					crownR - GAP,
				),
			],
		),
		impostX: MID - HALF_SPAN,
	}
}

/*
 * The ogee. A convex haunch struck from the springing line runs up to the
 * inflection; from there a concave crown arc carries the line over into the
 * point. The two are tangent externally — centres r + R apart, the join on the
 * segment between them — so the crown's centre sits out along the haunch's own
 * radius through the join, and its size answers the one demand left: that the
 * arc reach the apex.
 */
function ogeeArch(): ArchPaths {
	const springY = 320
	const haunchR = 230
	/* How far round from the springing the curve turns before it inflects */
	const inflection = (70 * Math.PI) / 180
	const haunchC: Point = [MID - HALF_SPAN + haunchR, springY]
	const join = add(haunchC, [
		-haunchR * Math.cos(inflection),
		-haunchR * Math.sin(inflection),
	])
	const apex: Point = [MID, APEX_Y]
	/* The circle through the join, centred out along the same radius, that meets the apex */
	const away = unit(sub(join, haunchC))
	const toApex = sub(apex, join)
	const crownR = dot(toApex, toApex) / (2 * dot(away, toApex))
	const crownC = add(join, scale(away, crownR))
	/* The crown's centre lies outside the curve, so its parallel line is the wider circle */
	const innerCrownR = crownR + GAP
	const innerJoin = add(haunchC, scale(away, haunchR - GAP))

	return {
		outer: symmetricPath(
			[MID - HALF_SPAN, springY],
			[segment(join, haunchR), segment(apex, crownR, 0)],
		),
		inner: symmetricPath(
			[MID - HALF_SPAN + GAP, springY],
			[
				segment(innerJoin, haunchR - GAP),
				segment(
					[
						MID,
						crownC[1] + Math.sqrt(innerCrownR ** 2 - (MID - crownC[0]) ** 2),
					],
					innerCrownR,
					0,
				),
			],
		),
		impostX: round(
			haunchC[0] - Math.sqrt(haunchR ** 2 - (springY - IMPOST_Y) ** 2),
		),
	}
}

/*
 * The Fatimid keel. A haunch arc struck from the springing line is continued by
 * a straight run to the apex — the ship's-keel profile. The straight is the
 * tangent drawn to the haunch circle from the apex, so the join is the tangency
 * point: at distance √(d² − r²) from the apex, where d is the apex's distance
 * from the haunch centre.
 */
function keelArch(): ArchPaths {
	const springY = 320
	const haunchR = 240
	const haunchC: Point = [MID - HALF_SPAN + haunchR, springY]
	const apex: Point = [MID, APEX_Y]
	const toApex = sub(apex, haunchC)
	const d = len(toApex)
	const tangentLen = Math.sqrt(d * d - haunchR ** 2)
	/* Of the two tangents from the apex, the one that touches the left flank */
	const join = add(
		haunchC,
		add(
			scale(toApex, haunchR ** 2 / (d * d)),
			scale(perp(toApex), (-haunchR * tangentLen) / (d * d)),
		),
	)
	const innerJoin = add(haunchC, scale(unit(sub(join, haunchC)), haunchR - GAP))
	/* The straight's parallel meets the axis where the offset line crosses it */
	const run = unit(sub(apex, join))
	const innerApexY = innerJoin[1] + ((MID - innerJoin[0]) * run[1]) / run[0]

	return {
		outer: symmetricPath(
			[MID - HALF_SPAN, springY],
			[segment(join, haunchR), segment(apex)],
		),
		inner: symmetricPath(
			[MID - HALF_SPAN + GAP, springY],
			[segment(innerJoin, haunchR - GAP), segment([MID, innerApexY])],
		),
		impostX: round(
			haunchC[0] - Math.sqrt(haunchR ** 2 - (springY - IMPOST_Y) ** 2),
		),
	}
}

/*
 * The seven-lobed multifoil. The lobes ride a supporting semicircle of the
 * family's own half-span, the central one straddling the apex, and each is a
 * circle internally tangent to that semicircle — centres on a circle a lobe
 * radius inside it. Neighbours overlap, so the outline runs lobe arc, cusp,
 * lobe arc: at each junction the two circles cross at 130°, closing the cusp to
 * a 50° spike, and the overlap that costs is what sets the lobe radius.
 *
 * The outer pair of lobes is halved by the springing, which is the usual thing
 * at an impost and the reason the flanks meet the hairlines vertically instead
 * of curling back into the frame.
 *
 * The inner line is the true parallel, which is not simply a smaller multifoil:
 * the cusps are spikes standing in the opening, and a line held 12 clear of one
 * has to turn around its point on a 12 radius. So the echo is lobe arcs of
 * ρ − 12 filleted at every cusp, each fillet meeting its neighbours where the
 * radius from the cusp to a lobe centre crosses both.
 */
function multifoilArch(): ArchPaths {
	const lobes = 7
	const cuspAngle = (130 * Math.PI) / 180
	const supportR = HALF_SPAN
	const centre: Point = [MID, APEX_Y + supportR]
	const impostDrop = centre[1] - IMPOST_Y
	/*
	 * Two circles of radius ρ whose centres are c apart cross at cos β = 1 −
	 * c²/2ρ², so a cusp of β wants ρ = (c/2)·√(2/(1 − cos β)); c itself is the
	 * chord between neighbouring lobe centres, which depends on ρ in turn.
	 */
	const overlap = Math.sqrt(2 / (1 - Math.cos(cuspAngle)))
	const half = (lobes - 1) / 2
	/*
	 * Spacing and lobe radius are settled together: the spacing has to put the
	 * outermost centres on the impost line, and the radius follows from the
	 * spacing. Starting from the supporting arc's own span, it converges in a
	 * couple of passes.
	 */
	let step = (2 * Math.acos(impostDrop / supportR)) / lobes
	let lobeR = 0
	let centresR = 0

	for (let pass = 0; pass < 8; pass++) {
		const chordHalf = Math.sin(step / 2)
		lobeR = (supportR * overlap * chordHalf) / (1 + overlap * chordHalf)
		centresR = supportR - lobeR
		step = Math.acos(impostDrop / centresR) / half
	}

	/* The cusps ride their own circle, the outer crossing of each pair of lobes */
	const cuspR =
		centresR * Math.cos(step / 2) +
		Math.sqrt(lobeR ** 2 - (centresR * Math.sin(step / 2)) ** 2)
	const lobeC = (k: number): Point => polar(centre, centresR, k * step)
	const cusp = (k: number): Point => polar(centre, cuspR, k * step)
	/* Where the halved outer lobe meets the impost, its tangent vertical */
	const springs: Point = [lobeC(-half)[0] - lobeR, IMPOST_Y]

	const outer: Segment[] = []
	const inner: Segment[] = []

	for (let k = -half; k <= 0; k++) {
		const here = lobeC(k)
		/* The left half stops at the apex, mid-way through the central lobe */
		const end = k === 0 ? ([MID, APEX_Y] as const) : cusp(k + 0.5)
		outer.push(segment(end, lobeR))

		if (k !== -half) {
			/* Round the spike the two lobes make, on the gap for a radius */
			inner.push(
				segment(
					add(here, scale(unit(sub(cusp(k - 0.5), here)), lobeR - GAP)),
					GAP,
					0,
				),
			)
		}

		inner.push(
			segment(
				k === 0
					? ([MID, APEX_Y + GAP] as const)
					: add(here, scale(unit(sub(end, here)), lobeR - GAP)),
				lobeR - GAP,
			),
		)
	}

	return {
		outer: symmetricPath(springs, outer),
		inner: symmetricPath([springs[0] + GAP, IMPOST_Y], inner),
		impostX: round(springs[0]),
	}
}

export const arches: Arch[] = [
	{
		id: 'drop',
		name: 'Two-centred drop arch',
		caption: {
			pre: 'Two-centred drop arch — the ',
			linkText: 'Mosque of Ibn Tulun',
			href: 'https://en.wikipedia.org/wiki/Mosque_of_Ibn_Tulun',
			post: ', Cairo, 876–879',
		},
		paths: dropArch(),
	},
	{
		id: 'horseshoe',
		name: 'Rounded horseshoe',
		caption: {
			pre: 'Rounded ',
			linkText: 'horseshoe arch',
			href: 'https://en.wikipedia.org/wiki/Horseshoe_arch',
			post: ' — the Great Mosque of Córdoba, from 785',
		},
		paths: horseshoeArch(),
	},
	{
		id: 'fourCentred',
		name: 'Four-centred arch',
		caption: {
			pre: '',
			linkText: 'Four-centred arch',
			href: 'https://en.wikipedia.org/wiki/Four-centred_arch',
			post: ' — Persia and the Timurid east',
		},
		paths: fourCentredArch(),
	},
	{
		id: 'ogee',
		name: 'Ogee arch',
		caption: {
			pre: '',
			linkText: 'Ogee arch',
			href: 'https://en.wikipedia.org/wiki/Ogee',
			post: ' — Mamluk Cairo, 14th century',
		},
		paths: ogeeArch(),
	},
	{
		id: 'keel',
		name: 'Keel arch',
		caption: {
			pre: 'Keel arch — Fatimid Cairo, the ',
			linkText: 'al-Aqmar Mosque',
			href: 'https://en.wikipedia.org/wiki/Aqmar_Mosque',
			post: ', 1125',
		},
		paths: keelArch(),
	},
	{
		id: 'multifoil',
		name: 'Seven-lobed multifoil',
		caption: {
			pre: '',
			linkText: 'Seven-lobed multifoil',
			href: 'https://en.wikipedia.org/wiki/Multifoil_arch',
			post: ' — the Aljafería, Zaragoza, 11th century',
		},
		paths: multifoilArch(),
	},
]
