import '@testing-library/jest-dom/vitest'

// Suppress unhandled errors from happy-dom iframe loading
// These are cleanup errors that don't affect test results
process.on('unhandledRejection', (error: any) => {
	if (
		error?.name === 'AbortError' ||
		error?.name === 'NetworkError' ||
		error?.message?.includes('The operation was aborted')
	) {
		// Ignore these specific happy-dom cleanup errors
		return
	}
	// Re-throw other unhandled rejections
	throw error
})
