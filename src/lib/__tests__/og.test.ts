import {describe, it, expect} from 'vitest'
import {escapeHtml} from '../og'

describe('escapeHtml', () => {
	it('escapes ampersands', () => {
		expect(escapeHtml('foo & bar')).toBe('foo &amp; bar')
	})

	it('escapes less-than signs', () => {
		expect(escapeHtml('a < b')).toBe('a &lt; b')
	})

	it('escapes greater-than signs', () => {
		expect(escapeHtml('a > b')).toBe('a &gt; b')
	})

	it('escapes double quotes', () => {
		expect(escapeHtml('say "hello"')).toBe('say &quot;hello&quot;')
	})

	it('escapes multiple special characters', () => {
		expect(escapeHtml('<script>"alert(1)"</script>')).toBe(
			'&lt;script&gt;&quot;alert(1)&quot;&lt;/script&gt;',
		)
	})

	it('preserves regular text', () => {
		expect(escapeHtml('Hello World')).toBe('Hello World')
	})

	it('handles empty string', () => {
		expect(escapeHtml('')).toBe('')
	})

	it('handles HTML entities in titles', () => {
		expect(escapeHtml("Why React's useEffect is confusing")).toBe(
			"Why React's useEffect is confusing",
		)
	})

	it('escapes combination of HTML and ampersand', () => {
		expect(escapeHtml('Tom & Jerry <script>')).toBe(
			'Tom &amp; Jerry &lt;script&gt;',
		)
	})
})
