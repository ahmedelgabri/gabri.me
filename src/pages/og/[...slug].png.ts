import type {APIRoute, GetStaticPaths} from 'astro'
import type {ReactNode} from 'react'
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import satori from 'satori'
import {Resvg} from '@resvg/resvg-js'
import {getAllBlogEntries, getBlogEntry} from '../../lib/content'
import siteMeta from '../../config/siteMeta'

const WIDTH = 1200
const HEIGHT = 630

const avatarPath = join(process.cwd(), 'src/assets/avatar.jpg')
const avatarBuffer = readFileSync(avatarPath)
const avatarBase64 = `data:image/jpeg;base64,${avatarBuffer.toString('base64')}`

export const getStaticPaths: GetStaticPaths = async () => {
	const entries = await getAllBlogEntries()
	return entries.map((entry) => ({
		params: {slug: entry.id.replace(/\/post$/, '')},
	}))
}

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

	const markup: ReactNode = {
		type: 'div',
		props: {
			style: {
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: '60px',
				backgroundColor: '#1f2325',
				color: '#f5f5f5',
				fontFamily: 'Inter',
			},
			children: [
				{
					type: 'div',
					props: {
						style: {display: 'flex', flexDirection: 'column', gap: '24px'},
						children: [
							{
								type: 'div',
								props: {
									style: {fontSize: '24px', color: '#3b82f6', fontWeight: 400},
									children: 'gabri.me',
								},
							},
							{
								type: 'div',
								props: {
									style: {
										fontSize: titleFontSize,
										fontWeight: 700,
										lineHeight: 1.2,
										maxWidth: '900px',
									},
									children: title,
								},
							},
						],
					},
				},
				{
					type: 'div',
					props: {
						style: {display: 'flex', alignItems: 'center', gap: '16px'},
						children: [
							{
								type: 'img',
								props: {
									src: avatarBase64,
									style: {width: '48px', height: '48px', borderRadius: '24px'},
								},
							},
							{
								type: 'div',
								props: {
									style: {display: 'flex', flexDirection: 'column'},
									children: [
										{
											type: 'div',
											props: {
												style: {fontSize: '20px', fontWeight: 600},
												children: author,
											},
										},
										{
											type: 'div',
											props: {
												style: {fontSize: '16px', color: '#a3a3a3'},
												children: 'Software Engineer',
											},
										},
									],
								},
							},
						],
					},
				},
			],
		},
	}

	const svg = await satori(markup, {
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
