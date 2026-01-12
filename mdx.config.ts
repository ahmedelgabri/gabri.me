import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeShiki from '@shikijs/rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import plainLight from './src/lib/plain-light.json'
import plainDark from './src/lib/plain-dark.json'

const shikiOptions = {
	themes: {
		light: plainLight,
		dark: plainDark,
	},
	defaultLanguage: 'txt',
}

// String references for Next.js Turbopack (serializable)
export const rehypePluginsForNext = [
	'rehype-slug',
	'rehype-code-titles',
	['@shikijs/rehype', shikiOptions],
	[
		'rehype-autolink-headings',
		{
			properties: {
				className: ['anchor'],
			},
		},
	],
]

// Actual imports for @mdx-js/rollup (used in Vitest)
export const rehypePlugins = [
	rehypeSlug,
	rehypeCodeTitles,
	[rehypeShiki, shikiOptions],
	[
		rehypeAutolinkHeadings,
		{
			properties: {
				className: ['anchor'],
			},
		},
	],
]
