import {MetadataRoute} from 'next'
import {getAllPosts} from '../lib/content'
import config from '../config/siteMeta'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const allPosts = await getAllPosts()
	const posts = allPosts.map((post) => ({
		url: `${config.siteUrl}/blog/${post.slug}`,
		changeFrequency: 'weekly' as const,
		priority: 0.9,
		lastModified: post.date,
	}))

	const routes = ['', '/card'].map((route) => ({
		url: `${config.siteUrl}${route}`,
		changeFrequency: 'yearly' as const,
		priority: route === '' ? 1 : 0.7,
		lastModified: new Date(),
	}))

	return [...routes, ...posts]
}
