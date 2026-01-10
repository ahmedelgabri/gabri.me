import {defineConfig} from 'vitest/config'
import path from 'node:path'
import mdx from '@mdx-js/rollup'
import {rehypePluginsForRollup} from './mdx.config'

export default defineConfig({
	plugins: [
		mdx({
			rehypePlugins: rehypePluginsForRollup,
		}),
	],
	test: {
		globals: true,
		environment: 'happy-dom',
		environmentOptions: {
			happyDOM: {
				settings: {
					disableIframePageLoading: true,
					disableErrorCapturing: false,
					enableFileSystemHttpRequests: false,
				},
			},
		},
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/.{idea,git,cache,output,temp}/**',
		],
		setupFiles: ['./vitest.setup.ts'],
		silent: false,
		outputFile: undefined,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '.'),
		},
	},
})
