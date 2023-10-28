import {MetadataRoute} from 'next'
import {allPosts} from 'contentlayer/generated'
import config from '../config/siteMeta'

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = allPosts.map((post) => ({
		url: `${config.siteUrl}/blog/${post.slug}`,
		changeFrequency: 'weekly',
		priority: 0.9,
		lastModified: post.date,
	}))

	const routes = ['', '/card'].map((route) => ({
		url: `${config.siteUrl}${route}`,
		changeFrequency: 'yearly',
		priority: route === '' ? 1 : 0.7,
		lastModified: new Date(),
	}))

	// @ts-expect-error whatever
	return [...routes, ...posts]
}
