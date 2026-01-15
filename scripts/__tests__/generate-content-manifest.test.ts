import {describe, it, expect} from 'vitest'
import {
	formatDate,
	generateExcerptFromMdx,
	extractMetadata,
} from '../generate-content-manifest'

describe('generate-content-manifest', () => {
	describe('formatDate', () => {
		it('should format ISO date string to yyyy-MM-dd', () => {
			expect(formatDate('2024-03-15')).toBe('2024-03-15')
		})

		it('should handle date with time component', () => {
			expect(formatDate('2024-03-15T10:30:00Z')).toBe('2024-03-15')
		})

		it('should pad single digit months and days', () => {
			expect(formatDate('2024-01-05')).toBe('2024-01-05')
		})
	})

	describe('generateExcerptFromMdx', () => {
		it('should strip metadata export', () => {
			const content = `export const metadata = {
	title: 'Test',
}

This is the actual content.`
			expect(generateExcerptFromMdx(content)).toBe(
				'This is the actual content.',
			)
		})

		it('should strip markdown headings', () => {
			const content = '# Heading\n\nSome content here.'
			expect(generateExcerptFromMdx(content)).toBe('Heading Some content here.')
		})

		it('should strip markdown links but keep text', () => {
			const content = 'Check out [this link](https://example.com) for more.'
			expect(generateExcerptFromMdx(content)).toBe(
				'Check out this link for more.',
			)
		})

		it('should strip HTML tags', () => {
			const content = 'Some <strong>bold</strong> and <em>italic</em> text.'
			expect(generateExcerptFromMdx(content)).toBe('Some bold and italic text.')
		})

		it('should strip markdown formatting characters', () => {
			const content = 'This is **bold** and _italic_ and `code`.'
			expect(generateExcerptFromMdx(content)).toBe(
				'This is bold and italic and code.',
			)
		})

		it('should truncate long content with ellipsis', () => {
			const content = 'A'.repeat(200)
			const result = generateExcerptFromMdx(content)
			expect(result.length).toBe(163)
			expect(result.endsWith('...')).toBe(true)
		})

		it('should not truncate content within limit', () => {
			const content = 'Short content.'
			expect(generateExcerptFromMdx(content)).toBe('Short content.')
		})

		it('should respect custom maxLength', () => {
			const content = 'A'.repeat(100)
			const result = generateExcerptFromMdx(content, 50)
			expect(result.length).toBe(53)
			expect(result.endsWith('...')).toBe(true)
		})
	})

	describe('extractMetadata', () => {
		it('should extract metadata from MDX content', () => {
			const content = `export const metadata = {
	title: 'Test Post',
	date: '2024-03-15',
	published: true,
	tags: ['test', 'example'],
}

Content here.`
			const result = extractMetadata(content)
			expect(result).toEqual({
				title: 'Test Post',
				date: '2024-03-15',
				published: true,
				tags: ['test', 'example'],
			})
		})

		it('should handle trailing commas', () => {
			const content = `export const metadata = {
	title: 'Test',
	tags: ['a', 'b',],
}

Content.`
			const result = extractMetadata(content)
			expect(result.title).toBe('Test')
			expect(result.tags).toEqual(['a', 'b'])
		})

		it('should return empty object for missing metadata', () => {
			const content = 'Just some content without metadata.'
			expect(extractMetadata(content)).toEqual({})
		})

		it('should return empty object for malformed metadata', () => {
			const content = `export const metadata = {
	title: 'Unclosed string
}

Content.`
			expect(extractMetadata(content)).toEqual({})
		})
	})
})
