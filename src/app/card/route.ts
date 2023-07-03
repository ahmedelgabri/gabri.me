import {getCard} from 'ahmedelgabri'

export async function GET() {
	process.env.NO_COLOR = '1'
	return new Response(getCard(), {status: 200})
}
