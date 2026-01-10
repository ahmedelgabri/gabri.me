import {describe, it, expect} from 'vitest'
import {
	getAllPosts,
	getAllWeeklyLinks,
	getPostBySlug,
	getAllContent,
} from '../content'

describe('content utilities', () => {
	describe('getAllPosts', () => {
		it('should return published posts with required metadata', async () => {
			const posts = await getAllPosts()

			expect(Array.isArray(posts)).toBe(true)
			expect(posts.length).toBeGreaterThan(0)

			const firstPost = posts[0]
			expect(firstPost).toHaveProperty('title')
			expect(firstPost).toHaveProperty('date')
			expect(firstPost).toHaveProperty('published')
			expect(firstPost).toHaveProperty('tags')
			expect(firstPost).toHaveProperty('excerpt')
			expect(firstPost).toHaveProperty('slug')
			expect(firstPost).toHaveProperty('url')
			expect(firstPost).toHaveProperty('formattedDate')
			expect(firstPost).toHaveProperty('updated')
			expect(firstPost).toHaveProperty('filePath')

			posts.forEach((post) => {
				expect(post.published).toBe(true)
			})
		})

		it('should have valid dates and URLs', async () => {
			const posts = await getAllPosts()

			posts.forEach((post) => {
				expect(post.formattedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
				expect(new Date(post.date).toString()).not.toBe('Invalid Date')
				expect(new Date(post.updated).toString()).not.toBe('Invalid Date')
				expect(post.url).toBe(`/blog/${post.slug}`)
				expect(post.filePath).toContain('src/_content/blog/')
				expect(post.filePath).toMatch(/\.mdx$/)
			})
		})

		it('should have non-empty excerpts within length limit', async () => {
			const posts = await getAllPosts()

			posts.forEach((post) => {
				expect(post.excerpt.length).toBeGreaterThan(0)
				expect(post.excerpt.length).toBeLessThanOrEqual(163)
			})
		})
	})

	describe('getAllWeeklyLinks', () => {
		it('should return weekly links with correct URLs', async () => {
			const links = await getAllWeeklyLinks()

			expect(Array.isArray(links)).toBe(true)
			expect(links.length).toBeGreaterThan(0)

			links.forEach((link) => {
				expect(link).toHaveProperty('title')
				expect(link).toHaveProperty('date')
				expect(link).toHaveProperty('slug')
				expect(link.url).toBe(`/weekly-links/${link.slug}`)
				expect(link.filePath).toContain('src/_content/weekly-links/')
			})
		})
	})

	describe('getPostBySlug', () => {
		it('should return specific post by slug', async () => {
			const allPosts = await getAllPosts()
			const testSlug = allPosts[0].slug

			const post = await getPostBySlug(testSlug, 'blog')

			expect(post).not.toBeNull()
			expect(post?.slug).toBe(testSlug)
		})

		it('should return weekly link by slug', async () => {
			const allLinks = await getAllWeeklyLinks()
			const testSlug = allLinks[0].slug

			const link = await getPostBySlug(testSlug, 'weekly-links')

			expect(link).not.toBeNull()
			expect(link?.url).toContain('/weekly-links/')
		})

		it('should return null for non-existent slug', async () => {
			const post = await getPostBySlug('non-existent-post-slug-12345', 'blog')

			expect(post).toBeNull()
		})

		it('should default to blog collection', async () => {
			const allPosts = await getAllPosts()
			const testSlug = allPosts[0].slug

			const post = await getPostBySlug(testSlug)

			expect(post).not.toBeNull()
			expect(post?.url).toContain('/blog/')
		})
	})

	describe('getAllContent', () => {
		it('should return combined posts and weekly links', async () => {
			const allContent = await getAllContent()
			const posts = await getAllPosts()
			const links = await getAllWeeklyLinks()

			expect(allContent.length).toBe(posts.length + links.length)

			const hasBlogPosts = allContent.some((item) =>
				item.url.startsWith('/blog/'),
			)
			const hasWeeklyLinks = allContent.some((item) =>
				item.url.startsWith('/weekly-links/'),
			)

			expect(hasBlogPosts).toBe(true)
			expect(hasWeeklyLinks).toBe(true)
		})
	})

	describe('data integrity', () => {
		it('should have unique slugs', async () => {
			const posts = await getAllPosts()
			const slugs = posts.map((p) => p.slug)
			const uniqueSlugs = new Set(slugs)

			expect(uniqueSlugs.size).toBe(slugs.length)
		})

		it('should have git timestamps in the past', async () => {
			const posts = await getAllPosts()
			const now = new Date()

			posts.forEach((post) => {
				const updated = new Date(post.updated)
				expect(updated.getTime()).toBeLessThanOrEqual(now.getTime())
			})
		})
	})
})
