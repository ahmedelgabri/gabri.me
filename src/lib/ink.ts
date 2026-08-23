/*
 * The design's two palettes as data, for the figures that are drawn outside CSS
 * and so cannot read a custom property: the three WebGL layers, and the social
 * card rendered at build time.
 *
 * Layout.astro's --zj-* block is where these colours are declared for the page,
 * and it stays that way — this is the same palette written again for the
 * renderers, not generated from it. Every value below has a token of the same
 * name there, and the two are meant to be changed together.
 */
export interface Palette {
	ground: string
	panel: string
	text: string
	textMuted: string
	accent: string
	/* Gilding only: hairlines, ornament, markers. Never body text */
	gild: string
	glaze: string
	/* Geometry strokes: lapis in daylight, oxidised silver on the indigo ground */
	geo: string
	hairline: string
	/* --zj-screen-opacity: the whole lattice's weight on the ground */
	screen: number
}

/* ————— Light: qishani ivory ————— */

export const LIGHT: Palette = {
	ground: '#f5eedf',
	panel: '#ece3cc',
	text: '#26221a',
	textMuted: '#5a5142',
	accent: '#1d3a6e',
	gild: '#a97c14',
	glaze: '#2a7268',
	geo: '#1d3a6e',
	hairline: 'rgba(169, 124, 20, 0.72)',
	screen: 0.06,
}

/* ————— Dark: the Blue Quran — gold on indigo-dyed vellum ————— */

export const DARK: Palette = {
	ground: '#132347',
	panel: '#1a2c55',
	text: '#ede3cb',
	textMuted: '#a99e85',
	accent: '#d9b44a',
	gild: '#d9b44a',
	glaze: '#6fb3a8',
	geo: '#c8bca0',
	hairline: 'rgba(217, 180, 74, 0.4)',
	screen: 0.08,
}
