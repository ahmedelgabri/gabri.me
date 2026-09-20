// @vitest-environment node
import {mkdtemp, readFile, rm, writeFile} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import {join} from 'node:path'
import {pathToFileURL} from 'node:url'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
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
	let buildDirectory

	beforeEach(async () => {
		buildDirectory = pathToFileURL(
			`${await mkdtemp(join(tmpdir(), 'indexnow-'))}/`,
		)
		await writeFile(new URL(`${key}.txt`, buildDirectory), `${key}\n`)
		await writeFile(new URL('sitemap.xml', buildDirectory), sitemap([siteUrl]))
	})

	afterEach(async () => {
		await rm(buildDirectory, {recursive: true, force: true})
	})

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

	async function prepareSubmission(urls = [siteUrl], status = 200) {
		await writeFile(new URL('sitemap.xml', buildDirectory), sitemap(urls))
		const request = vi
			.fn()
			.mockImplementation(async () => new Response('', {status}))
		vi.stubGlobal('fetch', request)
		return request
	}

	it.each([200, 202])(
		'submits the deployed sitemap and accepts HTTP %s',
		async (status) => {
			const urls = [siteUrl, `${siteUrl}/blog/example`]
			const request = await prepareSubmission(urls, status)
			expect(await submitSitemap(buildDirectory)).toEqual({
				count: 2,
				statuses: [status],
			})
			expect(request).toHaveBeenCalledTimes(1)
			const [endpoint, options] = request.mock.calls[0]
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
		const request = await prepareSubmission(urls)
		expect(await submitSitemap(buildDirectory)).toEqual({
			count: 10_001,
			statuses: [200, 200],
		})
		expect(request).toHaveBeenCalledTimes(2)
		expect(JSON.parse(request.mock.calls[0][1].body).urlList).toEqual(
			urls.slice(0, 10_000),
		)
		expect(JSON.parse(request.mock.calls[1][1].body).urlList).toEqual(
			urls.slice(10_000),
		)
	})

	it('does not submit if the built key is different', async () => {
		const request = await prepareSubmission()
		await writeFile(new URL(`${key}.txt`, buildDirectory), 'wrong key')
		await expect(submitSitemap(buildDirectory)).rejects.toThrow(
			'Built IndexNow key does not match',
		)
		expect(request).not.toHaveBeenCalled()
	})

	it.each([`${key}.txt`, 'sitemap.xml'])(
		'refuses a missing build file without submitting: %s',
		async (file) => {
			const request = await prepareSubmission()
			await rm(new URL(file, buildDirectory))
			await expect(submitSitemap(buildDirectory)).rejects.toThrow('ENOENT')
			expect(request).not.toHaveBeenCalled()
		},
	)

	it('rejects malformed sitemap XML before submitting', async () => {
		const request = await prepareSubmission()
		await writeFile(new URL('sitemap.xml', buildDirectory), '<urlset>')
		await expect(submitSitemap(buildDirectory)).rejects.toThrow(
			'Invalid sitemap XML',
		)
		expect(request).not.toHaveBeenCalled()
	})

	it('validates the entire sitemap before submitting any batch', async () => {
		const request = await prepareSubmission([
			siteUrl,
			'https://example.com/page',
		])
		await expect(submitSitemap(buildDirectory)).rejects.toThrow()
		expect(request).not.toHaveBeenCalled()
	})

	it.each([400, 403, 422, 429, 500])(
		'reports IndexNow HTTP %s and its response body',
		async (status) => {
			const request = await prepareSubmission()
			request.mockImplementation(
				async () => new Response('API error', {status}),
			)
			await expect(submitSitemap(buildDirectory)).rejects.toThrow(
				`IndexNow HTTP ${status}: API error`,
			)
		},
	)

	it('propagates network errors', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockRejectedValue(new Error('Network unavailable')),
		)
		await expect(submitSitemap(buildDirectory)).rejects.toThrow(
			'Network unavailable',
		)
	})
})
