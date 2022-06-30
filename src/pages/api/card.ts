import {VercelResponse, VercelRequest} from '@vercel/node'
import {getPlainCard} from 'ahmedelgabri'

export default function (_: VercelRequest, res: VercelResponse) {
	res.send(
		getPlainCard().replace(
			// https://stackoverflow.com/a/29497680/213124
			/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
			'',
		),
	)
}
