import {VercelResponse, VercelRequest} from '@vercel/node'
import {getCard} from 'ahmedelgabri'

export default function (req: VercelRequest, res: VercelResponse) {
	const {method} = req

	res.setHeader('Allow', ['GET'])

	if (method !== 'GET') {
		return res.status(405).end(`Method ${method} Not Allowed`)
	}

	res.send(getCard())
}
