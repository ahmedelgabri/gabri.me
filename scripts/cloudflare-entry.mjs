import astro from './astro-entry.mjs'
import {
	acceptsMarkdown,
	htmlPathFor,
	markdownPathFor,
} from './content-negotiation.mjs'

const SITE_ORIGIN = 'https://gabri.me'

function appendVary(headers, value) {
	const values = (headers.get('Vary') || '')
		.split(',')
		.map((entry) => entry.trim())
		.filter(Boolean)
	if (!values.some((entry) => entry.toLowerCase() === value.toLowerCase())) {
		values.push(value)
	}
	if (values.length > 0) headers.set('Vary', values.join(', '))
}

function markdownResponse(response, request, markdownPath, htmlPath) {
	const headers = new Headers(response.headers)
	headers.set(
		'Cache-Control',
		'public, s-maxage=1200, stale-while-revalidate=600',
	)
	headers.set('Content-Type', 'text/markdown; charset=utf-8')
	headers.set('Content-Location', markdownPath)
	headers.set(
		'Link',
		`<${SITE_ORIGIN}${htmlPath}>; rel="canonical"; type="text/html"`,
	)
	appendVary(headers, 'Accept')

	return new Response(request.method === 'HEAD' ? null : response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	})
}

async function fetchMarkdownAsset(request, env, markdownPath, htmlPath) {
	const assetUrl = new URL(request.url)
	assetUrl.pathname = markdownPath
	const response = await env.ASSETS.fetch(new Request(assetUrl, request))
	if (response.status === 404) return null
	return markdownResponse(response, request, markdownPath, htmlPath)
}

export default {
	async fetch(request, env, context) {
		const {pathname} = new URL(request.url)
		const directHtmlPath = htmlPathFor(pathname)

		if (directHtmlPath) {
			const response = await fetchMarkdownAsset(
				request,
				env,
				pathname,
				directHtmlPath,
			)
			if (response) return response
		}

		const markdownPath = markdownPathFor(pathname)
		if (
			markdownPath &&
			(request.method === 'GET' || request.method === 'HEAD') &&
			acceptsMarkdown(request.headers.get('Accept'))
		) {
			const response = await fetchMarkdownAsset(
				request,
				env,
				markdownPath,
				pathname,
			)
			if (response) return response
		}

		const response = await astro.fetch(request, env, context)
		if (
			markdownPath &&
			(request.method === 'GET' || request.method === 'HEAD')
		) {
			const headers = new Headers(response.headers)
			appendVary(headers, 'Accept')
			return new Response(request.method === 'HEAD' ? null : response.body, {
				status: response.status,
				statusText: response.statusText,
				headers,
			})
		}

		return response
	},
}
