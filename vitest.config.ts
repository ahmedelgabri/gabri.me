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
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/.{idea,git,cache,output,temp}/**',
		],
		setupFiles: ['./vitest.setup.ts'],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '.'),
			'next-view-transitions': path.resolve(
				__dirname,
				'./src/__mocks__/next-view-transitions.tsx',
			),
		},
	},
})
