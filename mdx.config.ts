import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// String references for Next.js (it resolves them automatically)
export const rehypePluginsForNext = [
	'rehype-slug',
	'rehype-code-titles',
	[
		'rehype-prism-plus',
		{
			defaultLanguage: 'txt',
		},
	],
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
export const rehypePluginsForRollup = [
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
]
