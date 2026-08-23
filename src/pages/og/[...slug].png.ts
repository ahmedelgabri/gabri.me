import type {APIRoute} from 'astro'
import {getBlogEntry, getBlogStaticPaths} from '../../lib/content'
import {renderPostCard} from './_card'

export const getStaticPaths = getBlogStaticPaths

export const GET: APIRoute = async ({params}) => {
	const slug = params.slug
	if (!slug) {
		return new Response('Not found', {status: 404})
	}

	const entry = await getBlogEntry(slug)
	if (!entry || !entry.data.published) {
		return new Response('Not found', {status: 404})
	}

	const png = await renderPostCard(entry.data.title, entry.data.date)

	return new Response(png as unknown as BodyInit, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	})
}
