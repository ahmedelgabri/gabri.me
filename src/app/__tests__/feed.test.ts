import {describe, it, expect} from 'vitest'
import {GET} from '../feed.xml/route'

describe('RSS Feed', () => {
	it('should return a Response object', async () => {
		const mockRequest = new Request('http://localhost:3000/feed.xml')
		const response = await GET(mockRequest)

		expect(response).toBeInstanceOf(Response)
	})

	it('should return XML content type', async () => {
		const mockRequest = new Request('http://localhost:3000/feed.xml')
		const response = await GET(mockRequest)

		expect(response.headers.get('Content-Type')).toBe('text/xml')
	})

	it('should set cache control headers', async () => {
		const mockRequest = new Request('http://localhost:3000/feed.xml')
		const response = await GET(mockRequest)

		const cacheControl = response.headers.get('Cache-Control')
		expect(cacheControl).toContain('public')
		expect(cacheControl).toContain('s-maxage=1200')
		expect(cacheControl).toContain('stale-while-revalidate=600')
	})

	it('should return valid XML', async () => {
		const mockRequest = new Request('http://localhost:3000/feed.xml')
		const response = await GET(mockRequest)
		const xml = await response.text()

		expect(xml).toContain('<?xml')
		expect(xml).toContain('<rss')
		expect(xml).toContain('</rss>')
	})

	it('should include channel information', async () => {
		const mockRequest = new Request('http://localhost:3000/feed.xml')
		const response = await GET(mockRequest)
		const xml = await response.text()

		expect(xml).toContain('<title>')
		expect(xml).toContain('<link>')
		expect(xml).toContain('<description>')
	})

	it('should include blog posts as items', async () => {
		const mockRequest = new Request('http://localhost:3000/feed.xml')
		const response = await GET(mockRequest)
		const xml = await response.text()

		expect(xml).toContain('<item>')
		expect(xml).toContain('</item>')
	})

	it('should include skipHours element', async () => {
		const mockRequest = new Request('http://localhost:3000/feed.xml')
		const response = await GET(mockRequest)
		const xml = await response.text()

		expect(xml).toContain('<skipHours>')
		expect(xml).toContain('</skipHours>')
	})

	it('should have TTL set to 60', async () => {
		const mockRequest = new Request('http://localhost:3000/feed.xml')
		const response = await GET(mockRequest)
		const xml = await response.text()

		expect(xml).toContain('<ttl>60</ttl>')
	})

	it('should include post titles and links', async () => {
		const mockRequest = new Request('http://localhost:3000/feed.xml')
		const response = await GET(mockRequest)
		const xml = await response.text()

		const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/g)
		expect(itemMatches).toBeDefined()
		expect(itemMatches!.length).toBeGreaterThan(0)

		const firstItem = itemMatches![0]
		expect(firstItem).toContain('<title>')
		expect(firstItem).toContain('<link>')
		expect(firstItem).toContain('guid')
		expect(firstItem).toContain('<pubDate>')
	})
})
