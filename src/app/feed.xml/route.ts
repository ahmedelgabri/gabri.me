import RSS from 'rss'
import truncate from 'lodash.truncate'
import {remark} from 'remark'
import {compareDesc} from 'date-fns'
import strip from 'strip-markdown'
import {posts as allPosts} from '#site/content'
import siteMeta from '../../config/siteMeta'

export async function GET(req: Request) {
	const {author, title, siteUrl, description} = siteMeta

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

	await Promise.all(
		sortedAllPosts.map(async (post) => {
			const {title, formattedDate, slug, raw} = post
			const stripped = await remark().use(strip).process(raw)
			const url = `${siteUrl}/blog/${slug}`

			feed.item({
				title,
				guid: url,
				url,
				date: formattedDate,
				description: truncate(stripped.value || '', {length: 500}).replace(
					'*',
					'',
				),
				author,
			})
		}),
	)

	const headers = new Headers(req.headers)

	headers.set(
		'Cache-Control',
		'public, s-maxage=1200, stale-while-revalidate=600',
	)
	headers.set('Content-Type', 'text/xml')

	return new Response(feed.xml({indent: true}), {headers})
}
