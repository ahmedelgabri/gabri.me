import {NowRequest, NowResponse} from '@vercel/node'
import {getCard} from 'ahmedelgabri'

const curl_user_agent_pattern = /^curl\/\d+\.\d+\.\d+$/

export default (req: NowRequest, res: NowResponse) => {
  const agent = req.headers['user-agent']
  const agent_is_curl = curl_user_agent_pattern.test(agent)

  if (agent_is_curl) {
    res.send(getCard())
  } else {
    res.status(400).json({
      message: `Try curl -L ${req.headers.host}${req.url} instead`,
    })
  }
}
