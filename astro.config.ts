import {createRequire} from 'node:module'
import {defineConfig} from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import UnoCSS from '@unocss/astro'
import cloudflare from '@astrojs/cloudflare'
import {shikiOptions} from './markdown.config'

import compressor from 'astro-compressor'

import frontendistahtmlMinify from '@frontendista/astro-html-minify'

/*
 * The card never changes between requests, and the package that draws it
 * assumes Node: it reads process.argv at module scope, which workerd leaves
 * undefined, so the module throws before the Worker can answer anything.
 * Building both spellings here keeps the package on this side of the build and
 * ships the endpoint two strings.
 */
function cardData() {
	const id = 'virtual:card'
	const resolved = `\0${id}`
	/*
	 * The card only ever carries colour codes, so this matches strip-ansi's
	 * output exactly — checked against it — without pulling an ESM-only
	 * package into a hook that cannot await one.
	 */
	const colours = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, 'g')

	return {
		name: 'gabrime:card-data',
		resolveId(source: string) {
			return source === id ? resolved : null
		},
		load(source: string) {
			if (source !== resolved) {
				return null
			}

			/* Node's own resolver: Vite's module runner is closed by this point */
			const {getCard} = createRequire(import.meta.url)('ahmedelgabri')
			const ansi: string = getCard()

			return [
				`export const ansi = ${JSON.stringify(ansi)}`,
				`export const plain = ${JSON.stringify(ansi.replace(colours, ''))}`,
			].join('\n')
		},
	}
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
		plugins: [cardData()],
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
