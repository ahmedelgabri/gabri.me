// @vitest-environment node
import {expect, it} from 'vitest'

// This needs `pnpm dev` and access to X's real syndication API.
it.skipIf(process.env.TWEET_LIVE_TEST !== '1')(
	'renders tweet content through the Workers development server',
	async () => {
		const response = await fetch(
			'http://localhost:4321/blog/death-by-thousand-config-files',
			{signal: AbortSignal.timeout(30_000)},
		)
		const html = await response.text()

		expect(response.status).toBe(200)
		expect(html).not.toContain('Tweet not found')
		expect(html).toContain('If we keep adding new')
		expect(html).toContain(
			'https://twitter.com/ahmedelgabri/status/902236725229101056',
		)
	},
	35_000,
)
