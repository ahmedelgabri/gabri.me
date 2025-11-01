import {defineConfig} from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

// https://astro.build/config
export default defineConfig({
	site: 'https://gabri.me',
	output: 'static',
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		mdx(),
		sitemap(),
	],
	markdown: {
		syntaxHighlight: false, // Using rehype-prism-plus instead
		rehypePlugins: [
			rehypeSlug,
			rehypeCodeTitles,
			[
				rehypePrism,
				{
					defaultLanguage: 'txt',
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ['anchor'],
					},
				},
			],
		],
	},
	redirects: {
		'/feed': '/feed.xml',
		'/work': '/',
		'/blog': '/',
	},
	server: {
		headers: {
			'Permissions-Policy': 'interest-cohort=()',
		},
	},
})
