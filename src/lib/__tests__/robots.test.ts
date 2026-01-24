import {describe, it, expect} from 'vitest'
import {generateRobotsTxt} from '../robots'

describe('generateRobotsTxt', () => {
	it('includes User-agent wildcard', () => {
		const result = generateRobotsTxt('https://example.com')
		expect(result).toContain('User-agent: *')
	})

	it('includes Allow directive', () => {
		const result = generateRobotsTxt('https://example.com')
		expect(result).toContain('Allow: /')
	})

	it('includes sitemap URL with site URL', () => {
		const result = generateRobotsTxt('https://gabri.me')
		expect(result).toContain('Sitemap: https://gabri.me/sitemap.xml')
	})

	it('handles site URL without trailing slash', () => {
		const result = generateRobotsTxt('https://example.com')
		expect(result).toContain('Sitemap: https://example.com/sitemap.xml')
	})

	it('produces correct format', () => {
		const result = generateRobotsTxt('https://gabri.me')
		expect(result).toBe(`User-agent: *
Allow: /

Sitemap: https://gabri.me/sitemap.xml
`)
	})
})
