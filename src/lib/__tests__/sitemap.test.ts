import {describe, it, expect} from 'vitest'
import {generateSitemapXml, type SitemapEntry} from '../sitemap'

describe('generateSitemapXml', () => {
	it('generates valid XML with single entry', () => {
		const entries: SitemapEntry[] = [
			{
				url: 'https://example.com/',
				lastmod: '2024-01-01',
				changefreq: 'weekly',
				priority: 1.0,
			},
		]

		const xml = generateSitemapXml(entries)

		expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
		expect(xml).toContain(
			'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		)
		expect(xml).toContain('<loc>https://example.com/</loc>')
		expect(xml).toContain('<lastmod>2024-01-01</lastmod>')
		expect(xml).toContain('<changefreq>weekly</changefreq>')
		expect(xml).toContain('<priority>1</priority>')
		expect(xml).toContain('</urlset>')
	})

	it('generates valid XML with multiple entries', () => {
		const entries: SitemapEntry[] = [
			{
				url: 'https://example.com/',
				lastmod: '2024-01-01',
				changefreq: 'yearly',
				priority: 1.0,
			},
			{
				url: 'https://example.com/blog/post-1',
				lastmod: '2024-01-15',
				changefreq: 'weekly',
				priority: 0.9,
			},
		]

		const xml = generateSitemapXml(entries)

		expect(xml).toContain('<loc>https://example.com/</loc>')
		expect(xml).toContain('<loc>https://example.com/blog/post-1</loc>')
		expect(xml.match(/<url>/g)).toHaveLength(2)
	})

	it('handles empty entries array', () => {
		const xml = generateSitemapXml([])

		expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
		expect(xml).toContain('</urlset>')
		expect(xml).not.toContain('<url>')
	})

	it('preserves decimal priority values', () => {
		const entries: SitemapEntry[] = [
			{
				url: 'https://example.com/',
				lastmod: '2024-01-01',
				changefreq: 'weekly',
				priority: 0.5,
			},
		]

		const xml = generateSitemapXml(entries)

		expect(xml).toContain('<priority>0.5</priority>')
	})

	it('handles ISO date strings', () => {
		const entries: SitemapEntry[] = [
			{
				url: 'https://example.com/',
				lastmod: '2024-01-15T10:30:00.000Z',
				changefreq: 'weekly',
				priority: 1.0,
			},
		]

		const xml = generateSitemapXml(entries)

		expect(xml).toContain('<lastmod>2024-01-15T10:30:00.000Z</lastmod>')
	})
})
