/*
 * The khatam (eight-point star) is the union of two squares rotated 45°
 * against each other. Every constant here follows from that construction:
 * outer vertices sit at radius r every 45°, inner vertices at the edge
 * intersections — radius r·√(2−√2), offset by 22.5°.
 */
export const INNER_RATIO = Math.sqrt(2 - Math.SQRT2)

function round(n: number): number {
	return Math.round(n * 100) / 100
}

export function starPoints(cx: number, cy: number, r: number): string {
	const points: string[] = []
	for (let k = 0; k < 16; k++) {
		const angle = (k * Math.PI) / 8
		const radius = k % 2 === 0 ? r : r * INNER_RATIO
		points.push(
			`${round(cx + radius * Math.cos(angle))},${round(cy + radius * Math.sin(angle))}`,
		)
	}
	return points.join(' ')
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
	const vertices: Array<[number, number]> = [
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
