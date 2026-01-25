import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeShiki from '@shikijs/rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import plainLight from './src/lib/plain-light.json'
import plainDark from './src/lib/plain-dark.json'

export const shikiOptions = {
	themes: {
		light: plainLight,
		dark: plainDark,
	},
	defaultLanguage: 'txt',
}

// Rehype plugins for MDX processing (used in Astro and Vitest)
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
