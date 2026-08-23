/*
 * The khatam (eight-point star) is the union of two squares rotated 45°
 * against each other. Every constant here follows from that construction:
 * outer vertices sit at radius r every 45°, inner vertices at the edge
 * intersections — radius r·√(2−√2), offset by 22.5°.
 */
export const INNER_RATIO = Math.sqrt(2 - Math.SQRT2)

/*
 * The other figure this page is built from: sixteen points stepped round a
 * circle and joined as the {16/6} star polygon. Both ratios are that polygon's
 * own crossings, as fractions of the generating radius — the petals' valleys
 * where consecutive chords meet, and the deep ring where the chords cross
 * closest to the centre — not numbers chosen by eye.
 */
export const VALLEY =
	Math.cos((6 * Math.PI) / 16) / Math.cos((5 * Math.PI) / 16)
export const DEEP = Math.cos((6 * Math.PI) / 16) / Math.cos(Math.PI / 16)

export type Point = [number, number]

export function round(n: number): number {
	return Math.round(n * 100) / 100
}

/*
 * The walk every khatam here is shaped from: sixteen vertices, outer and inner
 * alternating, starting due east. Left open, since a polygon closes itself and
 * a line strip has to be told to.
 */
export function starVertices(
	cx: number,
	cy: number,
	r: number,
	ratio = INNER_RATIO,
): Point[] {
	const points: Point[] = []
	for (let k = 0; k < 16; k++) {
		const angle = (k * Math.PI) / 8
		const radius = k % 2 === 0 ? r : r * ratio
		points.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)])
	}
	return points
}

export function starPoints(cx: number, cy: number, r: number): string {
	return starVertices(cx, cy, r)
		.map(([x, y]) => `${round(x)},${round(y)}`)
		.join(' ')
}

/*
 * The cross tile that fills the gap between four khatam stars in the
 * star-and-cross tiling. Its four tips reach radius r (the points where
 * neighbouring stars touch); the re-entrant corners at (±t, ±t) are where
 * the diagonal tips of the four surrounding stars point in.
 */
export function crossPoints(cx: number, cy: number, r: number): string {
	const a = r / Math.SQRT2
	const t = (Math.SQRT2 - 1) * a
	const vertices: Point[] = [
		[0, -r],
		[t, -a],
		[t, -t],
		[a, -t],
		[r, 0],
		[a, t],
		[t, t],
		[t, a],
		[0, r],
		[-t, a],
		[-t, t],
		[-a, t],
		[-r, 0],
		[-a, -t],
		[-t, -t],
		[-t, -a],
	]
	return vertices.map(([x, y]) => `${round(cx + x)},${round(cy + y)}`).join(' ')
}
