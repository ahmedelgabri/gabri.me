import {describe, it, expect} from 'vitest'
import {generateExcerpt} from '../excerpt'

describe('generateExcerpt', () => {
	it('returns empty string for undefined body', () => {
		expect(generateExcerpt(undefined)).toBe('')
	})

	it('returns empty string for empty body', () => {
		expect(generateExcerpt('')).toBe('')
	})

	it('strips YAML frontmatter', () => {
		const body = `---
title: Test Post
date: 2024-01-01
---

This is the actual content.`
		expect(generateExcerpt(body)).toBe('This is the actual content.')
	})

	it('removes import statements', () => {
		const body = `import Something from 'somewhere'
import {Other} from "other-place"

This is the content.`
		expect(generateExcerpt(body)).toBe('This is the content.')
	})

	it('removes markdown heading syntax', () => {
		const body = `# Heading 1
## Heading 2
### Heading 3
Regular text`
		expect(generateExcerpt(body)).toBe(
			'Heading 1 Heading 2 Heading 3 Regular text',
		)
	})

	it('converts markdown links to plain text', () => {
		const body = 'Check out [this link](https://example.com) for more info.'
		expect(generateExcerpt(body)).toBe('Check out this link for more info.')
	})

	it('removes HTML tags', () => {
		const body =
			'<p>This is <strong>bold</strong> and <em>italic</em> text.</p>'
		expect(generateExcerpt(body)).toBe('This is bold and italic text.')
	})

	it('removes markdown formatting characters', () => {
		const body = 'This is **bold**, *italic*, and `code`.'
		expect(generateExcerpt(body)).toBe('This is bold, italic, and code.')
	})

	it('collapses multiple newlines into single space', () => {
		const body = `First paragraph.


Second paragraph.

Third paragraph.`
		expect(generateExcerpt(body)).toBe(
			'First paragraph. Second paragraph. Third paragraph.',
		)
	})

	it('returns text as-is if under maxLength', () => {
		const body = 'Short text.'
		expect(generateExcerpt(body)).toBe('Short text.')
	})

	it('truncates to 160 characters by default and adds ellipsis', () => {
		const body = 'A'.repeat(200)
		const result = generateExcerpt(body)
		expect(result.length).toBe(163) // 160 + '...'
		expect(result.endsWith('...')).toBe(true)
	})

	it('respects custom maxLength parameter', () => {
		const body = 'A'.repeat(100)
		const result = generateExcerpt(body, 50)
		expect(result.length).toBe(53) // 50 + '...'
		expect(result.endsWith('...')).toBe(true)
	})

	it('does not add ellipsis if text equals maxLength exactly', () => {
		const body = 'A'.repeat(160)
		const result = generateExcerpt(body)
		expect(result).toBe('A'.repeat(160))
		expect(result.endsWith('...')).toBe(false)
	})

	it('handles complex markdown content', () => {
		const body = `---
title: Complex Post
---

import {Tweet} from 'astro-tweet'

# Introduction

This is a [great article](https://example.com) about **testing**.

<Tweet id="123" />

Here's some \`inline code\` and more text.`

		const result = generateExcerpt(body)
		expect(result).toBe(
			"Introduction This is a great article about testing. Here's some inline code and more text.",
		)
	})
})
