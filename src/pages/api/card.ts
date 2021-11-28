import {VercelResponse, VercelRequest} from '@vercel/node'
import {getCard} from 'ahmedelgabri'

export default function (_: VercelRequest, res: VercelResponse) {
  res.send(getCard())
}
