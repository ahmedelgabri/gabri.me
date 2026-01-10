import RSS from 'rss'
import truncate from 'lodash.truncate'
import {compareDesc} from 'date-fns'
import {getAllPosts} from '../../lib/content'
import siteMeta from '../../config/siteMeta'

export async function GET(req: Request) {
	const {author, title, siteUrl, description} = siteMeta

	const allPosts = await getAllPosts()
	const sortedAllPosts = allPosts.sort(({date: a}, {date: b}) =>
		compareDesc(new Date(a), new Date(b)),
	)

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

	sortedAllPosts.forEach((post) => {
		const {title, formattedDate, slug, excerpt} = post
		const url = `${siteUrl}/blog/${slug}`

		feed.item({
			title,
			guid: url,
			url,
			date: formattedDate,
			description: truncate(excerpt, {length: 500}),
			author,
		})
	})

	const headers = new Headers(req.headers)

	headers.set(
		'Cache-Control',
		'public, s-maxage=1200, stale-while-revalidate=600',
	)
	headers.set('Content-Type', 'text/xml')

	return new Response(feed.xml({indent: true}), {headers})
}
