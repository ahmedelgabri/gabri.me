import type {APIRoute} from 'astro'
import {ansi, plain} from 'virtual:card'

export const prerender = false

/* curl gets the colours; anything else would only see the escape codes */
export const GET: APIRoute = ({request}) => {
	const agent = request.headers.get('User-Agent')

	return new Response(agent?.startsWith('curl/') ? ansi : plain, {
		status: 200,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	})
}
