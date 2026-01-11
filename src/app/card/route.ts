import {getCard} from 'ahmedelgabri'
import stripAnsi from 'strip-ansi'

export const dynamic = 'force-static'

export async function GET(request: Request) {
	const agent = request.headers.get('User-Agent')
	const isCurl = agent?.startsWith('curl/')
	const card = getCard()

	return new Response(isCurl ? card : stripAnsi(card), {status: 200})
}
