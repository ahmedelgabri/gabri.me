import {defineConfig} from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import cloudflare from '@astrojs/cloudflare'
import {shikiOptions} from './markdown.config'

import compressor from 'astro-compressor'

import frontendistahtmlMinify from '@frontendista/astro-html-minify'
import {getCard} from 'ahmedelgabri'

/*
 * The card is the same string for every request, so it is drawn once here
 * rather than on each one. The package runs in workerd since v9, but rendering
 * it at the edge would ship a renderer to answer with a constant.
 */
function cardData() {
	const id = 'virtual:card'
	const resolved = `\0${id}`
	/* The card only ever carries colour codes, so this is the whole of it */
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

			const ansi = getCard()

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
	integrations: [react(), mdx(), compressor(), frontendistahtmlMinify()],

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
