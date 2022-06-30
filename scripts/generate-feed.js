const fs = require('fs')
const RSS = require('rss')
const truncate = require('lodash.truncate')
const remark = require('remark')
const strip = require('strip-markdown')
const {getAllPosts} = require('../src/lib/utils')
const siteMeta = require('../src/config/meta')

const {author, title, siteUrl, description} = siteMeta

;(async () => {
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

	const formatted = feed.xml({indent: true})
	// eslint-disable-next-line no-sync
	fs.writeFileSync('public/feed.xml', formatted)
})()
