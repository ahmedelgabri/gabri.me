import type {APIRoute, GetStaticPaths} from 'astro'
import type {ReactNode} from 'react'
import satori from 'satori'
import {html} from 'satori-html'
import {Resvg} from '@resvg/resvg-js'
import {getAllBlogEntries, getBlogEntry} from '../../lib/content'
import siteMeta from '../../config/siteMeta'

const WIDTH = 1200
const HEIGHT = 630

export const getStaticPaths: GetStaticPaths = async () => {
	const entries = await getAllBlogEntries()
	return entries.map((entry) => ({
		params: {slug: entry.id.replace(/\/post$/, '')},
	}))
}

async function loadGoogleFont(font: string, weight: number): Promise<ArrayBuffer> {
	const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&display=swap`
	const css = await fetch(url).then((res) => res.text())
	const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1]
	if (!fontUrl) {
		throw new Error(`Could not find font URL for ${font}`)
	}
	return fetch(fontUrl).then((res) => res.arrayBuffer())
}

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

export const GET: APIRoute = async ({params}) => {
	const slug = params.slug
	if (!slug) {
		return new Response('Not found', {status: 404})
	}

	const entry = await getBlogEntry(slug)
	if (!entry || !entry.data.published) {
		return new Response('Not found', {status: 404})
	}

	const {title} = entry.data
	const {author} = siteMeta
	const titleFontSize = title.length > 60 ? '48px' : '56px'

	const [interRegular, interBold] = await Promise.all([
		loadGoogleFont('Inter', 400),
		loadGoogleFont('Inter', 700),
	])

	const markup = html`
		<div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 60px; background-color: #1f2325; color: #f5f5f5; font-family: Inter;">
			<div style="display: flex; flex-direction: column; gap: 24px;">
				<div style="font-size: 24px; color: #3b82f6; font-weight: 400;">gabri.me</div>
				<div style="font-size: ${titleFontSize}; font-weight: 700; line-height: 1.2; max-width: 900px;">${escapeHtml(title)}</div>
			</div>
			<div style="display: flex; align-items: center; gap: 16px;">
				<div style="width: 48px; height: 48px; border-radius: 24px; background-color: #3b82f6; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700;">AG</div>
				<div style="display: flex; flex-direction: column;">
					<div style="font-size: 20px; font-weight: 600;">${escapeHtml(author)}</div>
					<div style="font-size: 16px; color: #a3a3a3;">Software Engineer</div>
				</div>
			</div>
		</div>
	`

	const svg = await satori(markup as ReactNode, {
		width: WIDTH,
		height: HEIGHT,
		fonts: [
			{
				name: 'Inter',
				data: interRegular,
				weight: 400,
				style: 'normal',
			},
			{
				name: 'Inter',
				data: interBold,
				weight: 700,
				style: 'normal',
			},
		],
	})

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: WIDTH,
		},
	})

	const pngBuffer = resvg.render().asPng()

	return new Response(pngBuffer as unknown as BodyInit, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	})
}
