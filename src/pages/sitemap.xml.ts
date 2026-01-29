import type {APIRoute} from 'astro'
import {getAllPosts} from '../lib/content'
import config from '../config/siteMeta'
import {generateSitemapXml, type SitemapEntry} from '../lib/sitemap'

export const GET: APIRoute = async () => {
	const allPosts = await getAllPosts()

	const posts: SitemapEntry[] = allPosts.map((post) => ({
		url: `${config.siteUrl}/blog/${post.slug}/`,
		lastmod: post.date,
		changefreq: 'weekly',
		priority: 0.9,
	}))

	const routes: SitemapEntry[] = ['/', '/card/'].map((route) => ({
		url: `${config.siteUrl}${route}`,
		lastmod: new Date().toISOString().split('T')[0],
		changefreq: 'yearly',
		priority: route === '/' ? 1 : 0.7,
	}))

	const entries = [...routes, ...posts]

	return new Response(generateSitemapXml(entries), {
		headers: {
			'Content-Type': 'application/xml',
		},
	})
}
