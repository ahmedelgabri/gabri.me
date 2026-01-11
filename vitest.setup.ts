import '@testing-library/jest-dom/vitest'
import {vi} from 'vitest'

// Mock child_process.exec to avoid slow git log calls in tests
vi.mock('node:child_process', async (importOriginal) => {
	const actual = await importOriginal<typeof import('node:child_process')>()
	const mockedExec = vi.fn((cmd: string, callback: Function) => {
		if (cmd.startsWith('git log')) {
			callback(null, {stdout: new Date().toISOString(), stderr: ''})
		} else {
			actual.exec(cmd, callback)
		}
	})
	return {
		...actual,
		default: {...actual, exec: mockedExec},
		exec: mockedExec,
	}
})
