import RSS from 'rss'
import truncate from 'lodash.truncate'
import {remark} from 'remark'
import strip from 'strip-markdown'
import {getAllPosts} from '../lib/utils'
import siteMeta from '../config/meta'

export async function getServerSideProps({res}) {
	const {author, title, siteUrl, description} = siteMeta

	const allPosts = (await getAllPosts()).sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
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
		allPosts.map(async ({title, date, content, slug}) => {
			const stripped = await remark().use(strip).process(content)

			feed.item({
				title: title,
				guid: `${siteUrl}${slug}`,
				date,
				description: truncate(stripped.contents || '', {length: 500}).replace(
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
