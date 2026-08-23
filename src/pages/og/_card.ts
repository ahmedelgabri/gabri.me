import {Resvg} from '@resvg/resvg-js'
import {format} from 'date-fns'
import satori, {type SatoriOptions} from 'satori'
import siteMeta from '../../config/siteMeta'
import {crossPoints, starPoints} from '../../designs/zellij/geometry'
import {shapeArabic} from './_arabic'

const WIDTH = 1200
const HEIGHT = 630

/* The gilded rule of the carpet page; everything it holds sits inside this */
const FRAME = 26
const PAGE = WIDTH - FRAME * 2
/* Social crops eat the edges, so the type keeps well clear of the rule */
const GUTTER = 54
/* Enough that the headpiece clears the khatams pinned through the top corners */
const HEADPIECE_GAP = 26
const RULE = 1.5

/* The night side of the design — the Blue Quran's gold on indigo-dyed vellum */
const ink = {
	ground: '#132347',
	text: '#EDE3CB',
	muted: '#A99E85',
	gild: '#D9B44A',
	geo: '#C8BCA0',
	hairline: 'rgba(217, 180, 74, 0.42)',
}

const NAME_AR = shapeArabic('أحمد الجابري')
const DOMAIN = new URL(siteMeta.siteUrl).host

function round(n: number): number {
	return Math.round(n * 100) / 100
}

function svgUri(svg: string): string {
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/*
 * The plate's border: a gilded rule with a hairline running outside it and a
 * khatam pinned through each corner — the site's page frame at plate scale.
 * The stars carry the ground as their fill so the rule passes behind them.
 */
const plate = svgUri(
	`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">` +
		`<rect x="14" y="14" width="${WIDTH - 28}" height="${HEIGHT - 28}" fill="none" stroke="${ink.hairline}" stroke-width="1.5"/>` +
		`<rect x="${FRAME}" y="${FRAME}" width="${PAGE}" height="${HEIGHT - FRAME * 2}" fill="none" stroke="${ink.gild}" stroke-width="2"/>` +
		[
			[FRAME, FRAME],
			[WIDTH - FRAME, FRAME],
			[FRAME, HEIGHT - FRAME],
			[WIDTH - FRAME, HEIGHT - FRAME],
		]
			.map(
				([cx, cy]) =>
					`<polygon points="${starPoints(cx, cy, 19)}" fill="${ink.ground}" stroke="${ink.gild}" stroke-width="1.8"/>`,
			)
			.join('') +
		`</svg>`,
)

/*
 * The star-and-cross frieze from under the site's masthead, ruled top and
 * bottom. Khatam stars sit on a square lattice of spacing 2√2·a (a = half-side
 * of the generating squares), which makes neighbours touch tip to tip and
 * leaves the gaps on the half-lattice as cross tiles; cropping the tiling to a
 * single row of stars leaves the classic half-crosses along both edges. The
 * lattice is sized to divide the band exactly, so the band meets the frame on
 * a whole tile at either end.
 */
function frieze(width: number, target: number): {uri: string; height: number} {
	const count = Math.round(width / target)
	const unit = width / count
	const r = unit / 2
	const a = unit / (2 * Math.SQRT2)

	const crosses = Array.from({length: count + 1}, (_, i) => i * unit)
		.flatMap((cx) => [crossPoints(cx, 0, r), crossPoints(cx, unit, r)])
		.map((points) => `<polygon points="${points}"/>`)
		.join('')

	const centres = Array.from({length: count}, (_, i) => round(i * unit + r))
	const squares = centres
		.map((cx) => {
			const box = `x="${round(cx - a)}" y="${round(r - a)}" width="${round(2 * a)}" height="${round(2 * a)}"`
			return `<rect ${box}/><rect ${box} transform="rotate(45 ${cx} ${round(r)})"/>`
		})
		.join('')
	const stars = centres
		.map((cx) => `<polygon points="${starPoints(cx, r, r)}"/>`)
		.join('')

	const height = unit + RULE * 2
	const rules =
		`<g stroke="${ink.hairline}" stroke-width="${RULE}">` +
		`<line x1="0" y1="${RULE / 2}" x2="${round(width)}" y2="${RULE / 2}"/>` +
		`<line x1="0" y1="${round(height - RULE / 2)}" x2="${round(width)}" y2="${round(height - RULE / 2)}"/>` +
		`</g>`

	return {
		height,
		uri: svgUri(
			`<svg xmlns="http://www.w3.org/2000/svg" width="${round(width)}" height="${round(height)}" viewBox="0 0 ${round(width)} ${round(height)}">` +
				`<g fill="none">${rules}<g transform="translate(0 ${RULE})">` +
				`<g stroke="${ink.geo}" stroke-width="1.2" opacity="0.35">${crosses}</g>` +
				`<g stroke="${ink.gild}" stroke-width="0.9" opacity="0.6">${squares}</g>` +
				`<g stroke="${ink.geo}" stroke-width="1.5">${stars}</g>` +
				`</g></g></svg>`,
		),
	}
}

const headpiece = frieze(PAGE, 56)

/*
 * Without a browser user agent Google serves plain TrueType rather than woff2,
 * which is the one format satori can parse.
 */
async function loadGoogleFont(
	font: string,
	weight: number,
): Promise<ArrayBuffer> {
	const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&display=swap`
	const css = await fetch(url).then((res) => res.text())
	const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1]
	if (!fontUrl) {
		throw new Error(`Could not find font URL for ${font}`)
	}
	return fetch(fontUrl).then((res) => res.arrayBuffer())
}

/* Every post's card wants the same four faces; fetch them once for the build */
let faces: Promise<SatoriOptions['fonts']> | undefined

function fonts(): Promise<SatoriOptions['fonts']> {
	faces ??= Promise.all([
		loadGoogleFont('Amiri', 400),
		loadGoogleFont('Amiri', 700),
		loadGoogleFont('Spectral', 400),
		loadGoogleFont('Spectral', 600),
	]).then(([amiri, amiriBold, spectral, spectralSemibold]) => [
		{name: 'Amiri', data: amiri, weight: 400, style: 'normal'},
		{name: 'Amiri', data: amiriBold, weight: 700, style: 'normal'},
		{name: 'Spectral', data: spectral, weight: 400, style: 'normal'},
		{name: 'Spectral', data: spectralSemibold, weight: 600, style: 'normal'},
	])
	return faces
}

type Style = Record<string, unknown>
type Node = Record<string, unknown>

function box(style: Style, children: Node | Node[] | string): Node {
	return {type: 'div', props: {style: {display: 'flex', ...style}, children}}
}

function display(content: string, style: Style): Node {
	return box({fontFamily: 'Amiri', fontWeight: 700, ...style}, content)
}

/* Amiri's Arabic runs long above and below the line, so it needs the room */
function arabic(fontSize: number): Node {
	return box(
		{fontFamily: 'Amiri', fontSize, lineHeight: 1.5, color: ink.gild},
		NAME_AR,
	)
}

function smallCaps(content: string, style: Style): Node {
	return box(
		{
			fontFamily: 'Spectral',
			fontWeight: 600,
			letterSpacing: '0.16em',
			...style,
		},
		content,
	)
}

const colophonRule: Node = {
	type: 'div',
	props: {
		style: {
			height: RULE,
			margin: `0 ${GUTTER}px 20px`,
			backgroundColor: ink.hairline,
		},
	},
}

/*
 * One plate whatever it carries: the frame behind everything, the girih
 * headpiece under the top rule, then the content down the rest of the page.
 */
function plateMarkup(children: Node[]): Node {
	return box(
		{
			position: 'relative',
			width: '100%',
			height: '100%',
			flexDirection: 'column',
			padding: FRAME,
			backgroundColor: ink.ground,
			color: ink.text,
		},
		[
			{
				type: 'img',
				props: {
					src: plate,
					width: WIDTH,
					height: HEIGHT,
					style: {position: 'absolute', top: 0, left: 0},
				},
			},
			{
				type: 'img',
				props: {
					src: headpiece.uri,
					width: PAGE,
					height: headpiece.height,
					style: {marginTop: HEADPIECE_GAP},
				},
			},
			...children,
		],
	)
}

/*
 * Amiri sets narrow, but a headline still has to survive the thumbnail a feed
 * shows it at, so the ladder gives up size only as fast as the title needs.
 */
function titleSize(title: string): number {
	if (title.length <= 26) return 84
	if (title.length <= 44) return 72
	if (title.length <= 62) return 62
	if (title.length <= 86) return 54
	return 46
}

async function toPng(markup: Node): Promise<Buffer> {
	const svg = await satori(markup as unknown as React.ReactNode, {
		width: WIDTH,
		height: HEIGHT,
		fonts: await fonts(),
	})
	return new Resvg(svg, {fitTo: {mode: 'width', value: WIDTH}}).render().asPng()
}

/*
 * A post's plate: the title holds the whole field, and the colophon at the
 * foot says whose page it is and when it was written.
 */
export function renderPostCard(title: string, date: Date): Promise<Buffer> {
	return toPng(
		plateMarkup([
			box(
				{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					padding: `0 ${GUTTER}px`,
				},
				display(title, {
					fontSize: titleSize(title),
					lineHeight: 1.24,
					textAlign: 'center',
				}),
			),
			colophonRule,
			box(
				{
					justifyContent: 'space-between',
					alignItems: 'flex-end',
					padding: `0 ${GUTTER}px 10px`,
				},
				[
					box({flexDirection: 'column'}, [
						display(siteMeta.author, {fontSize: 28}),
						arabic(25),
					]),
					box({flexDirection: 'column', alignItems: 'flex-end'}, [
						box(
							{fontFamily: 'Spectral', fontSize: 25, color: ink.muted},
							format(date, 'yyyy-MM-dd'),
						),
						smallCaps(DOMAIN, {fontSize: 22, color: ink.gild, marginTop: 8}),
					]),
				],
			),
		]),
	)
}

/*
 * The site's own plate: the name in both scripts, and what I do under it. This
 * is where public/img/fb-image.jpg — the card every page but a post shares —
 * comes from; it is rendered from here and committed rather than built, since
 * nothing about it changes between builds.
 *
 * Nothing in the project can run a TypeScript file on its own, so rendering it
 * again means bundling this module first, with the esbuild that comes along
 * with vite. From the project root:
 *
 *   node_modules/.bin/esbuild src/pages/og/_card.ts --bundle --platform=node \
 *     --format=esm --outfile=/tmp/card.mjs --external:@resvg/resvg-js \
 *     --external:satori --external:sharp --external:date-fns
 *   node --input-type=module -e "
 *     import {renderHomeCard} from '/tmp/card.mjs'
 *     import sharp from 'sharp'
 *     const png = await renderHomeCard()
 *     await sharp(png).jpeg({quality: 96}).toFile('public/img/fb-image.jpg')
 *   "
 */
export function renderHomeCard(): Promise<Buffer> {
	return toPng(
		plateMarkup([
			box(
				{
					flex: 1,
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: `0 ${GUTTER}px`,
				},
				[
					display(siteMeta.author, {fontSize: 92, lineHeight: 1.2}),
					arabic(50),
					smallCaps(siteMeta.title.toUpperCase(), {
						fontSize: 24,
						letterSpacing: '0.26em',
						color: ink.muted,
						marginTop: 24,
					}),
				],
			),
			colophonRule,
			box({justifyContent: 'center', padding: `0 ${GUTTER}px 10px`}, [
				smallCaps(DOMAIN, {fontSize: 22, color: ink.gild}),
			]),
		]),
	)
}
