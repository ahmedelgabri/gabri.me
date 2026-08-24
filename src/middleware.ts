import {defineMiddleware} from 'astro:middleware'
import {
	acceptsMarkdown,
	markdownPathFor,
} from '../scripts/content-negotiation.mjs'

export const onRequest = defineMiddleware(async (context, next) => {
	// Production negotiation runs in the Worker before Cloudflare serves static HTML.
	if (!import.meta.env.DEV) {
		return next()
	}

	const {request, url} = context
	const markdownPath = markdownPathFor(url.pathname)

	if (
		markdownPath &&
		(request.method === 'GET' || request.method === 'HEAD') &&
		acceptsMarkdown(request.headers.get('Accept'))
	) {
		return context.rewrite(markdownPath)
	}

	const response = await next()
	if (markdownPath) {
		response.headers.append('Vary', 'Accept')
	}
	return response
})
