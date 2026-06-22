import {defineConfig} from 'astro/config'
import {unified} from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import UnoCSS from '@unocss/astro'
import netlify from '@astrojs/netlify'
import {rehypePlugins} from './mdx.config'

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
		// Disabled so @shikijs/rehype can be used as a manual rehype plugin,
		// giving us control over execution order (e.g. after rehype-code-titles).
		syntaxHighlight: false,
		processor: unified({
			rehypePlugins: rehypePlugins as any,
		}),
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
