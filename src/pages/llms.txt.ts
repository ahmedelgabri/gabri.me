import type {APIRoute} from 'astro'
import {getAllPosts} from '../lib/content'
import {generateHomepageMarkdown} from '../lib/markdown'

export const GET: APIRoute = async () => {
	const markdown = generateHomepageMarkdown(await getAllPosts())

	return new Response(markdown, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
		},
	})
}
