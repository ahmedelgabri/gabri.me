import {describe, it, expect} from 'vitest'
import sitemap from '../sitemap'

describe('sitemap', () => {
	it('should return an array of sitemap entries', async () => {
		const result = await sitemap()

		expect(Array.isArray(result)).toBe(true)
		expect(result.length).toBeGreaterThan(0)
	})

	it('should include homepage with highest priority', async () => {
		const result = await sitemap()
		const homepage = result.find(
			(entry) => !entry.url.includes('/blog/') && !entry.url.includes('/card'),
		)

		expect(homepage).toBeDefined()
		expect(homepage?.priority).toBe(1)
		expect(homepage?.changeFrequency).toBe('yearly')
	})

	it('should include card route', async () => {
		const result = await sitemap()
		const cardPage = result.find((entry) => entry.url.endsWith('/card'))

		expect(cardPage).toBeDefined()
		expect(cardPage?.priority).toBe(0.7)
		expect(cardPage?.changeFrequency).toBe('yearly')
	})

	it('should include blog posts', async () => {
		const result = await sitemap()
		const blogPosts = result.filter((entry) => entry.url.includes('/blog/'))

		expect(blogPosts.length).toBeGreaterThan(0)
	})

	it('should have correct properties for blog posts', async () => {
		const result = await sitemap()
		const blogPost = result.find((entry) => entry.url.includes('/blog/'))

		expect(blogPost).toBeDefined()
		expect(blogPost?.priority).toBe(0.9)
		expect(blogPost?.changeFrequency).toBe('weekly')
		expect(blogPost?.lastModified).toBeDefined()
	})

	it('should have valid URLs', async () => {
		const result = await sitemap()

		result.forEach((entry) => {
			expect(entry.url).toMatch(/^https?:\/\//)
			expect(typeof entry.url).toBe('string')
		})
	})

	it('should have lastModified dates', async () => {
		const result = await sitemap()

		result.forEach((entry) => {
			expect(entry.lastModified).toBeDefined()
			expect(
				entry.lastModified instanceof Date ||
					typeof entry.lastModified === 'string',
			).toBe(true)
		})
	})
})
