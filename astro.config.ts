import {defineConfig} from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import UnoCSS from '@unocss/astro'
import netlify from '@astrojs/netlify'
import {shikiOptions} from './markdown.config'

import compressor from 'astro-compressor'

import frontendistahtmlMinify from '@frontendista/astro-html-minify'

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
		shikiConfig: shikiOptions,
	},

	redirects: {
		'/feed': '/feed.xml',
		'/work': '/',
		'/blog': '/',
	},

	vite: {
		server: {
			watch: {
				ignored: ['**/.claude/**'],
			},
		},
	},

	adapter: netlify(),

	devToolbar: {
		enabled: false,
	},
})
