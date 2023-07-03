import RSS from 'rss'
import truncate from 'lodash.truncate'
import {remark} from 'remark'
import {compareDesc} from 'date-fns'
import strip from 'strip-markdown'
import {allPosts, type Post} from 'contentlayer/generated'
import siteMeta from '../config/siteMeta'

export async function getServerSideProps({res}: {res: any}) {
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
		sortedAllPosts.map(async (post: Post) => {
			const {title, formattedDate, body, slug} = post
			const stripped = await remark().use(strip).process(body.raw)
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

	res.setHeader('Content-Type', 'text/xml')
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=1200, stale-while-revalidate=600',
	)
	res.write(feed.xml({indent: true}))
	res.end()

	return {
		props: {},
	}
}

export default function RSSFeed() {
	return null
}
