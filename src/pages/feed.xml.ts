import rss from '@astrojs/rss'
import {getCollection} from 'astro:content'
import siteMeta from '../config/siteMeta'

export async function GET(context: any) {
	const {author, title, siteUrl, description} = siteMeta

	const posts = await getCollection('posts', ({data}) => {
		return data.published !== false
	})

	const sortedPosts = posts.sort(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
	)

	return rss({
		title: `${author} | ${title}`,
		description,
		site: context.site || siteUrl,
		items: sortedPosts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.excerpt || '',
			link: `/blog/${post.slug}/`,
		})),
		customData: `<language>en-us</language>`,
		stylesheet: false,
	})
}
