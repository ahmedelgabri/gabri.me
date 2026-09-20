// @vitest-environment node
import {execFile} from 'node:child_process'
import {promisify} from 'node:util'
import {expect, it} from 'vitest'

// Live submissions must follow a production deployment, not a preview or local test run.
it.skipIf(process.env.INDEXNOW_LIVE_TEST !== '1')(
	'submits the production sitemap through the CLI to the real IndexNow API',
	async () => {
		const {stdout, stderr} = await promisify(execFile)(
			process.execPath,
			['scripts/indexnow.mjs'],
			{timeout: 120_000},
		)
		expect(stderr).toBe('')
		expect(stdout).toMatch(
			/^Submitted [1-9]\d* sitemap URLs to IndexNow \(HTTP (?:200|202)(?:, (?:200|202))*\)\.\n(?:IndexNow key validation is pending\.\n)?$/,
		)
	},
	130_000,
)
