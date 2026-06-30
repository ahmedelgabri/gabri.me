import {defineConfig} from 'vitest/config'
import path from 'node:path'

export default defineConfig({
	test: {
		globals: true,
		environment: 'happy-dom',
		environmentOptions: {
			happyDOM: {
				settings: {
					navigation: {
						disableChildFrameNavigation: true,
					},
				},
			},
		},
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
		},
	},
})
