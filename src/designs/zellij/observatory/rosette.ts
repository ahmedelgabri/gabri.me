/*
 * The figure this builds is the one tiling the page ground: sixteen points
 * stepped round a circle of radius R and joined as the {16/6} star polygon.
 * Both radii below are that polygon's own crossings — the petals' valleys
 * where consecutive chords meet, and the deep ring where the chords cross
 * closest to the centre — not numbers chosen by eye.
 *
 * The construction is laid out in the order a compass and straightedge would
 * lay it: the schedule and the captions come from the demonstration this was
 * drawn for, where it ran on a canvas. Here every layer is an SVG path whose
 * dash offset is the drawing hand, so the plate opens without waiting on a
 * renderer and the hairlines stay hairlines.
 */
import {INNER_RATIO} from '../geometry'

export const VALLEY =
	Math.cos((6 * Math.PI) / 16) / Math.cos((5 * Math.PI) / 16)
export const DEEP = Math.cos((6 * Math.PI) / 16) / Math.cos(Math.PI / 16)
/* One sixteenth of the circle: the step the whole figure is built on */
const STEP = Math.PI / 8
const POINT_COUNT = 16
/* Each point is joined to the sixth from it: the {16/6} */
const CHORD_STEP = 6

/* When each layer starts drawing itself in, and how long it takes */
const CIRCLE = [0, 1.4]
const POINTS = [0.9, 1.2]
const CHORDS = [2.2, 3.4]
const MARKS = [5.7, 0.9]
const PETALS = [6.8, 2.2]
const INNER = [9.1, 2.1]
const KHATAM = [10.2, 1.4]
/* The scaffolding dies away and leaves the figure it generated standing */
export const ERASE = [11.4, 1]
/* Then the figure goes too, and the compass starts again */
export const CLEAR = [13.6, 0.8]
export const LOOP = 14.8

export const LABELS: Array<[number, string]> = [
	[0, 'the compass circle · sixteen points'],
	[CHORDS[0], 'joined as the {16/6} star polygon'],
	[MARKS[0], 'where its chords cross'],
	[PETALS[0], 'sixteen petals · tips at R, valleys at 0.689 R'],
	[INNER[0], 'the inner ring at 0.390 R · a khatam inscribed in it'],
	[ERASE[0], 'the tile behind this page'],
]

/*
 * A compass prick is set down whole; a pen is walked along its line. Those are
 * the only two ways anything here appears, and each layer picks one.
 */
export type Kind = 'mark' | 'draw'

export interface Stroke {
	d: string
	/* Where in the layer's own reveal this stroke starts, and how long it takes */
	from: number
	span: number
}

export interface Layer {
	kind: Kind
	from: number
	span: number
	/* The weights of the tile: structure strokes at 1, infill at 0.55 */
	weight: number
	/* Scaffolding is wiped once the figure stands; the figure itself is not */
	scaffold: boolean
	strokes: Stroke[]
}

/*
 * The demonstration lit each segment over 1/22 of its layer's reveal. A prick
 * has no length to be walked along, so that is the whole of its appearing.
 */
const PRICK = 1 / 22
/* Arm lengths of the two crosses, as fractions of the generating radius */
const POINT_ARM = 0.022
const MARK_ARM = 0.016

type Place = (angle: number, radius: number) => [number, number]

function round(value: number): number {
	return Math.round(value * 100) / 100
}

function line(points: Array<[number, number]>): string {
	return points
		.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${round(x)} ${round(y)}`)
		.join('')
}

/* A closed ring of alternating radii — the shape of every drawn layer here */
function ring(
	place: Place,
	steps: number,
	radii: (k: number) => number,
): Array<[number, number]> {
	const points: Array<[number, number]> = []

	for (let k = 0; k <= steps; k++) {
		points.push(place((k * Math.PI * 2) / steps, radii(k % steps)))
	}

	return points
}

/* One continuous path, walked from its start to its end */
function trace(
	points: Array<[number, number]>,
	schedule: number[],
	weight: number,
	scaffold: boolean,
): Layer {
	return {
		kind: 'draw',
		from: schedule[0],
		span: schedule[1],
		weight,
		scaffold,
		strokes: [{d: line(points), from: 0, span: 1}],
	}
}

/* A cross the size of a compass prick, set down on one of the figure's crossings */
function prick([x, y]: [number, number], arm: number, tilted: boolean): string {
	const pairs: Array<[[number, number], [number, number]]> = tilted
		? [
				[
					[x - arm, y - arm],
					[x + arm, y + arm],
				],
				[
					[x - arm, y + arm],
					[x + arm, y - arm],
				],
			]
		: [
				[
					[x - arm, y],
					[x + arm, y],
				],
				[
					[x, y - arm],
					[x, y + arm],
				],
			]

	return pairs.map(([from, to]) => line([from, to])).join('')
}

/*
 * Built in the plate's own pixels rather than at radius 1, so one user unit is
 * one hairline and the dash offsets need no rescaling as the plate reflows.
 */
export function buildLayers(cx: number, cy: number, r: number): Layer[] {
	const place: Place = (angle, radius) => [
		cx + Math.cos(angle) * radius * r,
		cy + Math.sin(angle) * radius * r,
	]

	/* ————— 1. The compass circle, and the sixteen points stepped round it ————— */

	const circle = trace(
		ring(place, 192, () => 1),
		CIRCLE,
		0.42,
		true,
	)

	const points: Layer = {
		kind: 'mark',
		from: POINTS[0],
		span: POINTS[1],
		weight: 0.5,
		scaffold: true,
		strokes: Array.from({length: POINT_COUNT}, (_, k) => ({
			d: prick(place(k * STEP, 1), POINT_ARM * r, false),
			from: k / POINT_COUNT,
			span: PRICK,
		})),
	}

	/* ————— 2. The {16/6} chords ————— */

	const chords: Layer = {
		kind: 'draw',
		from: CHORDS[0],
		span: CHORDS[1],
		weight: 0.42,
		scaffold: true,
		strokes: Array.from({length: POINT_COUNT}, (_, k) => ({
			d: line([
				place(k * STEP, 1),
				place(((k + CHORD_STEP) % POINT_COUNT) * STEP, 1),
			]),
			from: k / POINT_COUNT,
			span: 1 / POINT_COUNT,
		})),
	}

	/* ————— 3. The crossings the rest of the figure is measured from ————— */

	const marks: Layer = {
		kind: 'mark',
		from: MARKS[0],
		span: MARKS[1],
		weight: 0.55,
		scaffold: true,
		strokes: Array.from({length: 32}, (_, k) => ({
			d: prick(
				place((k * STEP) / 2, k % 2 === 0 ? DEEP : VALLEY),
				MARK_ARM * r,
				true,
			),
			from: k / 32,
			span: PRICK,
		})),
	}

	/* ————— 4. Petals, 5. the nested ring and its circle, and the khatam ————— */

	return [
		circle,
		points,
		chords,
		marks,
		trace(
			ring(place, 32, (k) => (k % 2 === 0 ? 1 : VALLEY)),
			PETALS,
			1,
			false,
		),
		trace(
			ring(place, 32, (k) => (k % 2 === 0 ? DEEP : VALLEY)),
			INNER,
			0.55,
			false,
		),
		trace(
			ring(place, 128, () => DEEP),
			INNER,
			0.55,
			false,
		),
		trace(
			ring(place, 16, (k) => (k % 2 === 0 ? DEEP : DEEP * INNER_RATIO)),
			KHATAM,
			1,
			false,
		),
	]
}

/*
 * The same figure with everything but the ring of petals dropped: at
 * twenty-four pixels the chords and their crossings collapse into a smudge,
 * while sixteen tips around one ring still read as what they are.
 */
export function glyphPetals(cx: number, cy: number, r: number): string {
	const petals: string[] = []

	for (let k = 0; k < POINT_COUNT * 2; k++) {
		const angle = (k * Math.PI) / POINT_COUNT
		const radius = k % 2 === 0 ? r : r * VALLEY
		petals.push(
			`${round(cx + Math.cos(angle) * radius)},${round(cy + Math.sin(angle) * radius)}`,
		)
	}

	return petals.join(' ')
}
