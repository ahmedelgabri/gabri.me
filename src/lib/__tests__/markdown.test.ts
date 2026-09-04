import {describe, expect, it} from 'vitest'
import {generateBlogPostMarkdown, mdxBodyToMarkdown} from '../markdown'

describe('mdxBodyToMarkdown', () => {
	it('removes MDX imports without changing imports inside code fences', () => {
		const body = `import Tweet from 'astro-tweet'

Text.

\`\`\`js
import thing from 'package'
\`\`\``

		expect(mdxBodyToMarkdown(body)).toBe(
			`

Text.

\`\`\`js
import thing from 'package'
\`\`\``.trim(),
		)
	})

	it('turns Tweet components into links', () => {
		expect(mdxBodyToMarkdown('<Tweet id="123456" />')).toBe(
			'[View this post on X](https://x.com/i/status/123456)',
		)
	})

	it('normalizes React-only HTML attributes', () => {
		expect(
			mdxBodyToMarkdown(
				'<div className="example" style={{background: \'white\'}}>Text</div>',
			),
		).toBe('<div class="example">Text</div>')
	})

	it('uses the light-theme image and removes its MDX wrapper', () => {
		const body = `<center>
	<Image class="zj-only-light" src={light} alt="Logo" />
	<Image class="zj-only-dark" src={dark} alt="Logo" />
</center>`

		expect(
			mdxBodyToMarkdown(body, {
				assets: {light: 'https://gabri.me/logo-light.svg'},
			}),
		).toBe('![Logo](https://gabri.me/logo-light.svg)')
	})
})

describe('generateBlogPostMarkdown', () => {
	it('adds post metadata and a canonical URL', () => {
		const markdown = generateBlogPostMarkdown({
			title: 'A post',
			date: new Date('2026-08-24T12:00:00Z'),
			tags: ['astro', 'markdown'],
			body: 'Post body.',
			slug: 'a-post',
		})

		expect(markdown).toContain('# A post\n\nPublished: 2026-08-24')
		expect(markdown).toContain('Canonical: https://gabri.me/blog/a-post')
		expect(markdown).toContain('Tags: astro, markdown')
		expect(markdown).toContain('\n\nPost body.\n')
	})
})
