import {getCard} from 'ahmedelgabri'
import stripAnsi from 'strip-ansi'

export async function GET({request}: {request: Request}) {
	const agent = request.headers.get('User-Agent')
	const isCurl = agent?.startsWith('curl/')
	const card = getCard()

	return new Response(isCurl ? card : stripAnsi(card), {
		status: 200,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	})
}
