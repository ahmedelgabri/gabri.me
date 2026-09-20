// @vitest-environment node
import {readFile} from 'node:fs/promises'
import {afterEach, describe, expect, it, vi} from 'vitest'
import {key, siteUrl, sitemapUrls, submitSitemap} from '../indexnow.mjs'
import config from '../../src/config/siteMeta.ts'
import {generateSitemapXml} from '../../src/lib/sitemap.ts'

const sitemap = (urls) =>
	`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc></url>`).join('')}</urlset>`

afterEach(() => vi.unstubAllGlobals())

describe('sitemapUrls', () => {
	it('reads all locations, decodes XML entities, and removes duplicates', () => {
		expect(
			sitemapUrls(sitemap([siteUrl, `${siteUrl}/?a=1&amp;b=2`, siteUrl])),
		).toEqual([siteUrl, `${siteUrl}/?a=1&b=2`])
	})

	it.each([
		'<urlset>',
		'<html>Not a sitemap</html>',
		'<urlset/>',
		'<sitemapindex><sitemap><loc>https://gabri.me/map.xml</loc></sitemap></sitemapindex>',
		'<urlset><url><lastmod>2026-01-01</lastmod></url></urlset>',
		sitemap(['https://example.com/page']),
		sitemap(['https://preview.gabri.me/page']),
		sitemap(['/relative']),
		sitemap(['http://gabri.me/page']),
	])('rejects an invalid or non-production sitemap: %s', (xml) => {
		expect(() => sitemapUrls(xml)).toThrow()
	})
})

describe('IndexNow integration', () => {
	it('reads the site generator output using the canonical production origin', () => {
		expect(siteUrl).toBe(config.siteUrl)
		const urls = [config.siteUrl, `${config.siteUrl}/blog/example`]
		const xml = generateSitemapXml(
			urls.map((url) => ({
				url,
				lastmod: '2026-01-01',
				changefreq: 'weekly',
				priority: 0.9,
			})),
		)
		expect(sitemapUrls(xml)).toEqual(urls)
	})

	it('publishes a verification file containing the configured key', async () => {
		expect(
			await readFile(
				new URL(`../../public/${key}.txt`, import.meta.url),
				'utf8',
			),
		).toBe(`${key}\n`)
	})

	function mockFetch(urls = [siteUrl], status = 200) {
		const request = vi
			.fn()
			.mockResolvedValueOnce(new Response(key))
			.mockResolvedValueOnce(new Response(sitemap(urls)))
			.mockImplementation(async () => new Response('', {status}))
		vi.stubGlobal('fetch', request)
		return request
	}

	it.each([200, 202])(
		'submits the deployed sitemap and accepts HTTP %s',
		async (status) => {
			const urls = [siteUrl, `${siteUrl}/blog/example`]
			const request = mockFetch(urls, status)
			expect(await submitSitemap()).toEqual({count: 2, statuses: [status]})
			expect(request.mock.calls[0][0]).toBe(`${siteUrl}/${key}.txt`)
			expect(request.mock.calls[1][0]).toBe(`${siteUrl}/sitemap.xml`)
			const [endpoint, options] = request.mock.calls[2]
			expect(endpoint).toBe('https://api.indexnow.org/indexnow')
			expect(options.method).toBe('POST')
			expect(options.headers['Content-Type']).toBe(
				'application/json; charset=utf-8',
			)
			expect(JSON.parse(options.body)).toEqual({
				host: 'gabri.me',
				key,
				keyLocation: `${siteUrl}/${key}.txt`,
				urlList: urls,
			})
		},
	)

	it('batches at the 10,000 URL protocol limit', async () => {
		const urls = Array.from({length: 10_001}, (_, i) => `${siteUrl}/blog/${i}`)
		const request = mockFetch(urls)
		expect(await submitSitemap()).toEqual({count: 10_001, statuses: [200, 200]})
		expect(JSON.parse(request.mock.calls[2][1].body).urlList).toEqual(
			urls.slice(0, 10_000),
		)
		expect(JSON.parse(request.mock.calls[3][1].body).urlList).toEqual(
			urls.slice(10_000),
		)
	})

	it('does not submit if the deployed key is different', async () => {
		const request = vi.fn().mockResolvedValue(new Response('wrong key'))
		vi.stubGlobal('fetch', request)
		await expect(submitSitemap()).rejects.toThrow(
			'Deployed IndexNow key does not match',
		)
		expect(request).toHaveBeenCalledTimes(1)
	})

	it.each([403, 404, 500])(
		'reports key fetch failure HTTP %s',
		async (status) => {
			const request = vi.fn().mockResolvedValue(new Response('', {status}))
			vi.stubGlobal('fetch', request)
			await expect(submitSitemap()).rejects.toThrow(`HTTP ${status}`)
			expect(request).toHaveBeenCalledTimes(1)
		},
	)

	it('reports a failed sitemap fetch without submitting', async () => {
		const request = vi
			.fn()
			.mockResolvedValueOnce(new Response(key))
			.mockResolvedValueOnce(new Response('', {status: 503}))
		vi.stubGlobal('fetch', request)
		await expect(submitSitemap()).rejects.toThrow('HTTP 503')
		expect(request).toHaveBeenCalledTimes(2)
	})

	it('validates the entire sitemap before submitting any batch', async () => {
		const request = mockFetch([siteUrl, 'https://example.com/page'])
		await expect(submitSitemap()).rejects.toThrow()
		expect(request).toHaveBeenCalledTimes(2)
	})

	it.each([400, 403, 422, 429, 500])(
		'reports IndexNow HTTP %s and its response body',
		async (status) => {
			const request = mockFetch()
			request.mockImplementation(
				async () => new Response('API error', {status}),
			)
			await expect(submitSitemap()).rejects.toThrow(
				`IndexNow HTTP ${status}: API error`,
			)
		},
	)

	it('propagates network errors', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockRejectedValue(new Error('Network unavailable')),
		)
		await expect(submitSitemap()).rejects.toThrow('Network unavailable')
	})
})
