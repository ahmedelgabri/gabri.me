import {pathToFileURL} from 'node:url'
import {XMLParser, XMLValidator} from 'fast-xml-parser'

export const key = '81d6a71347c14e5b9f422d09b02d625b'
export const siteUrl = 'https://gabri.me'

export function sitemapUrls(xml) {
	if (XMLValidator.validate(xml) !== true) {
		throw new Error('Invalid sitemap XML')
	}
	const parser = new XMLParser({
		parseTagValue: false,
		isArray: (_name, path) => path === 'urlset.url',
	})
	const entries = parser.parse(xml).urlset?.url
	if (!Array.isArray(entries) || entries.length === 0) {
		throw new Error('Expected a non-empty sitemap urlset')
	}
	const urls = entries.map((entry) => {
		const location = entry.loc
		if (typeof location !== 'string' || new URL(location).origin !== siteUrl) {
			throw new Error(`Invalid production sitemap URL: ${location}`)
		}
		return location
	})
	return [...new Set(urls)]
}

async function fetchText(url) {
	const response = await fetch(url, {signal: AbortSignal.timeout(30_000)})
	if (!response.ok) {
		throw new Error(`HTTP ${response.status} fetching ${url}`)
	}
	return response.text()
}

export async function submitSitemap() {
	const keyLocation = `${siteUrl}/${key}.txt`
	if ((await fetchText(keyLocation)).trim() !== key) {
		throw new Error('Deployed IndexNow key does not match')
	}
	const urls = sitemapUrls(await fetchText(`${siteUrl}/sitemap.xml`))
	const statuses = []
	for (let start = 0; start < urls.length; start += 10_000) {
		const response = await fetch('https://api.indexnow.org/indexnow', {
			method: 'POST',
			headers: {'Content-Type': 'application/json; charset=utf-8'},
			body: JSON.stringify({
				host: new URL(siteUrl).host,
				key,
				keyLocation,
				urlList: urls.slice(start, start + 10_000),
			}),
			signal: AbortSignal.timeout(30_000),
		})
		if (response.status !== 200 && response.status !== 202) {
			throw new Error(
				`IndexNow HTTP ${response.status}: ${await response.text()}`,
			)
		}
		statuses.push(response.status)
	}
	return {count: urls.length, statuses}
}

if (
	process.argv[1] &&
	import.meta.url === pathToFileURL(process.argv[1]).href
) {
	try {
		const {count, statuses} = await submitSitemap()
		console.log(
			`Submitted ${count} sitemap URLs to IndexNow (HTTP ${statuses.join(', ')}).`,
		)
		if (statuses.includes(202)) {
			console.log('IndexNow key validation is pending.')
		}
	} catch (error) {
		console.error(error.message)
		process.exitCode = 1
	}
}
