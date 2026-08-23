import {defineConfig} from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import UnoCSS from '@unocss/astro'
import cloudflare from '@astrojs/cloudflare'
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

	// The single source of truth for redirects: the Cloudflare adapter compiles
	// these into `dist/client/_redirects`, which Workers static assets serves as
	// 301s.
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

	// Prerender in Node, not workerd: /og/[...slug].png renders through
	// @resvg/resvg-js, a native Node addon workerd cannot load.
	adapter: cloudflare({
		prerenderEnvironment: 'node',
	}),

	devToolbar: {
		enabled: false,
	},
})
