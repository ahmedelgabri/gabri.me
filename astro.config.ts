import {defineConfig} from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import UnoCSS from '@unocss/astro'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeShiki from '@shikijs/rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import plainLight from './src/lib/plain-light.json'
import plainDark from './src/lib/plain-dark.json'
import netlify from '@astrojs/netlify'

import compressor from 'astro-compressor'

import frontendistahtmlMinify from '@frontendista/astro-html-minify'

const shikiOptions = {
	themes: {
		light: plainLight,
		dark: plainDark,
	},
	defaultLanguage: 'txt',
}
export default defineConfig({
	site: 'https://gabri.me',
	trailingSlash: 'never',
	integrations: [
		UnoCSS(),
		react(),
		mdx(),
		compressor(),
		frontendistahtmlMinify(),
	],

	markdown: {
		syntaxHighlight: false,
		rehypePlugins: [
			rehypeSlug as any,
			rehypeCodeTitles as any,
			[rehypeShiki as any, shikiOptions],
			[
				rehypeAutolinkHeadings as any,
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

	vite: {
		resolve: {
			alias: {
				'@': new URL('./', import.meta.url).pathname,
			},
		},
	},

	adapter: netlify(),
})
