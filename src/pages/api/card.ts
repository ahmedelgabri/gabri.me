import {VercelResponse, VercelRequest} from '@vercel/node'
import {getPlainCard} from 'ahmedelgabri'

export default function (req: VercelRequest, res: VercelResponse) {
	const {method} = req

	res.setHeader('Allow', ['GET'])

	if (method !== 'GET') {
		return res.status(405).end(`Method ${method} Not Allowed`)
	}

	res.send(
		getPlainCard().replace(
			// https://stackoverflow.com/a/29497680/213124
			/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
			'',
		),
	)
}
