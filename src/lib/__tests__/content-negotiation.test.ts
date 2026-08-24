import {describe, expect, it} from 'vitest'
import {
	acceptsMarkdown,
	markdownPathFor,
} from '../../../scripts/content-negotiation.mjs'

describe('acceptsMarkdown', () => {
	it('requires an explicit text/markdown media type', () => {
		expect(acceptsMarkdown('text/markdown')).toBe(true)
		expect(acceptsMarkdown('text/html,application/xhtml+xml,*/*;q=0.8')).toBe(
			false,
		)
		expect(acceptsMarkdown('*/*')).toBe(false)
		expect(acceptsMarkdown(null)).toBe(false)
	})

	it('honours quality values', () => {
		expect(acceptsMarkdown('text/html;q=0.8,text/markdown')).toBe(true)
		expect(acceptsMarkdown('text/html,text/markdown;q=0.5')).toBe(false)
		expect(acceptsMarkdown('text/markdown;q=0,*/*')).toBe(false)
	})
})

describe('markdownPathFor', () => {
	it('maps public HTML pages to their Markdown representation', () => {
		expect(markdownPathFor('/')).toBe('/index.md')
		expect(markdownPathFor('/blog/example')).toBe('/blog/example.md')
	})

	it('does not map non-page routes', () => {
		expect(markdownPathFor('/blog/example/')).toBeNull()
		expect(markdownPathFor('/blog/example.md')).toBeNull()
		expect(markdownPathFor('/feed.xml')).toBeNull()
	})
})
