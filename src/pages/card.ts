import type {APIRoute} from 'astro'
import {getCard} from 'ahmedelgabri'
import stripAnsi from 'strip-ansi'

export const prerender = false

export const GET: APIRoute = async ({request}) => {
	const agent = request.headers.get('User-Agent')
	const isCurl = agent?.startsWith('curl/')
	const card = getCard()

	return new Response(isCurl ? card : stripAnsi(card), {
		status: 200,
		headers: {
			'Content-Type': 'text/plain',
		},
	})
}
