import {describe, it, expect} from 'vitest'
import {
	getAllPosts,
	getAllWeeklyLinks,
	getPostBySlug,
	getAllContent,
} from '../content'

describe('content utilities', () => {
	describe('getAllPosts', () => {
		it('should return an array of blog posts', async () => {
			const posts = await getAllPosts()

			expect(Array.isArray(posts)).toBe(true)
			expect(posts.length).toBeGreaterThan(0)
		})

		it('should return posts with required metadata fields', async () => {
			const posts = await getAllPosts()
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

			expect(typeof firstPost.title).toBe('string')
			expect(typeof firstPost.date).toBe('string')
			expect(typeof firstPost.published).toBe('boolean')
			expect(Array.isArray(firstPost.tags)).toBe(true)
			expect(typeof firstPost.excerpt).toBe('string')
			expect(typeof firstPost.slug).toBe('string')
			expect(typeof firstPost.url).toBe('string')
			expect(typeof firstPost.formattedDate).toBe('string')
			expect(typeof firstPost.updated).toBe('string')
			expect(typeof firstPost.filePath).toBe('string')
		})

		it('should only return published posts', async () => {
			const posts = await getAllPosts()

			posts.forEach((post) => {
				expect(post.published).toBe(true)
			})
		})

		it('should format dates correctly', async () => {
			const posts = await getAllPosts()
			const firstPost = posts[0]

			// formattedDate should be in YYYY-MM-DD format
			expect(firstPost.formattedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)

			// date should be a valid ISO date string
			expect(new Date(firstPost.date).toString()).not.toBe('Invalid Date')

			// updated should be a valid ISO date string
			expect(new Date(firstPost.updated).toString()).not.toBe('Invalid Date')
		})

		it('should generate correct blog URLs', async () => {
			const posts = await getAllPosts()

			posts.forEach((post) => {
				expect(post.url).toMatch(/^\/blog\/[a-z0-9-]+$/)
				expect(post.url).toBe(`/blog/${post.slug}`)
			})
		})

		it('should have non-empty excerpts', async () => {
			const posts = await getAllPosts()

			posts.forEach((post) => {
				expect(post.excerpt.length).toBeGreaterThan(0)
				expect(post.excerpt.length).toBeLessThanOrEqual(163) // 160 + '...'
			})
		})

		it('should have valid file paths', async () => {
			const posts = await getAllPosts()

			posts.forEach((post) => {
				expect(post.filePath).toContain('src/_content/blog/')
				expect(post.filePath).toMatch(/\.mdx$/)
			})
		})
	})

	describe('getAllWeeklyLinks', () => {
		it('should return an array of weekly links', async () => {
			const links = await getAllWeeklyLinks()

			expect(Array.isArray(links)).toBe(true)
			expect(links.length).toBeGreaterThan(0)
		})

		it('should return weekly links with required metadata', async () => {
			const links = await getAllWeeklyLinks()
			const firstLink = links[0]

			expect(firstLink).toHaveProperty('title')
			expect(firstLink).toHaveProperty('date')
			expect(firstLink).toHaveProperty('slug')
		})

		it('should generate correct weekly-links URLs', async () => {
			const links = await getAllWeeklyLinks()

			links.forEach((link) => {
				expect(link.url).toMatch(/^\/weekly-links\/[a-z0-9-]+$/)
				expect(link.url).toBe(`/weekly-links/${link.slug}`)
			})
		})

		it('should have valid file paths for weekly links', async () => {
			const links = await getAllWeeklyLinks()

			links.forEach((link) => {
				expect(link.filePath).toContain('src/_content/weekly-links/')
				expect(link.filePath).toMatch(/\.mdx$/)
			})
		})
	})

	describe('getPostBySlug', () => {
		it('should return a specific blog post by slug', async () => {
			const allPosts = await getAllPosts()
			const testSlug = allPosts[0].slug

			const post = await getPostBySlug(testSlug, 'blog')

			expect(post).not.toBeNull()
			expect(post?.slug).toBe(testSlug)
		})

		it('should return a specific weekly link by slug', async () => {
			const allLinks = await getAllWeeklyLinks()
			const testSlug = allLinks[0].slug

			const link = await getPostBySlug(testSlug, 'weekly-links')

			expect(link).not.toBeNull()
			expect(link?.slug).toBe(testSlug)
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
		it('should return all posts and weekly links combined', async () => {
			const allContent = await getAllContent()
			const posts = await getAllPosts()
			const links = await getAllWeeklyLinks()

			expect(allContent.length).toBe(posts.length + links.length)
		})

		it('should contain both blog posts and weekly links', async () => {
			const allContent = await getAllContent()

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

	describe('metadata validation', () => {
		it('should have valid date formats for all posts', async () => {
			const posts = await getAllPosts()

			posts.forEach((post) => {
				const date = new Date(post.date)
				expect(date.toString()).not.toBe('Invalid Date')
				expect(date.getFullYear()).toBeGreaterThan(2000)
				expect(date.getFullYear()).toBeLessThan(2100)
			})
		})

		it('should have non-empty titles for all posts', async () => {
			const posts = await getAllPosts()

			posts.forEach((post) => {
				expect(post.title.trim().length).toBeGreaterThan(0)
			})
		})

		it('should have valid tags arrays', async () => {
			const posts = await getAllPosts()

			posts.forEach((post) => {
				expect(Array.isArray(post.tags)).toBe(true)
				post.tags.forEach((tag) => {
					expect(typeof tag).toBe('string')
					expect(tag.trim().length).toBeGreaterThan(0)
				})
			})
		})

		it('should have unique slugs', async () => {
			const posts = await getAllPosts()
			const slugs = posts.map((p) => p.slug)
			const uniqueSlugs = new Set(slugs)

			expect(uniqueSlugs.size).toBe(slugs.length)
		})
	})

	describe('content integrity', () => {
		it('should match specific known post', async () => {
			const post = await getPostBySlug(
				'analyzing-optimizing-your-webpack-bundle',
				'blog',
			)

			expect(post).not.toBeNull()
			expect(post?.title).toBe('Analyzing & optimizing your webpack bundle')
			expect(post?.date).toBe('2017-01-29')
			expect(post?.tags).toContain('webpack')
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
