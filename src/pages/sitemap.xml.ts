import type {APIRoute} from 'astro'
import {getAllPosts} from '../lib/content'
import config from '../config/siteMeta'

export const GET: APIRoute = async () => {
	const allPosts = await getAllPosts()

	const posts = allPosts.map((post) => ({
		url: `${config.siteUrl}/blog/${post.slug}`,
		lastmod: post.date,
		changefreq: 'weekly',
		priority: 0.9,
	}))

	const routes = ['', '/card'].map((route) => ({
		url: `${config.siteUrl}${route}`,
		lastmod: new Date().toISOString().split('T')[0],
		changefreq: 'yearly',
		priority: route === '' ? 1 : 0.7,
	}))

	const urls = [...routes, ...posts]

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
	)
	.join('\n')}
</urlset>`

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
		},
	})
}
