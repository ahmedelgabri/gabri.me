import type {APIRoute} from 'astro'
import RSS from 'rss'
import truncate from 'lodash.truncate'
import {getBlogIndex} from '../lib/content'
import siteMeta from '../config/siteMeta'

export const GET: APIRoute = async () => {
	const {author, title, siteUrl, description} = siteMeta

	const posts = await getBlogIndex()

	const feed = new RSS({
		title: `${author} | ${title}`,
		site_url: siteUrl,
		feed_url: `${siteUrl}/feed.xml`,
		description,
		ttl: 60,
		custom_elements: [
			{
				// skip from midnight 0 till 9
				skipHours: Array.from({length: 10}, (_, i) => i).map((h) => ({
					hour: h,
				})),
			},
		],
	})

	posts.forEach((post) => {
		const {title, formattedDate, excerpt} = post
		const url = new URL(post.url, siteUrl).href

		feed.item({
			title,
			guid: url,
			url,
			date: formattedDate,
			description: truncate(excerpt, {length: 500}),
			author,
		})
	})

	return new Response(feed.xml({indent: true}), {
		headers: {
			'Content-Type': 'text/xml',
			'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
		},
	})
}
