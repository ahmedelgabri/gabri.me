import '@testing-library/jest-dom/vitest'

// Suppress stderr and stdout output from happy-dom iframe loading and vite warnings
// These errors/warnings are expected when iframe loading is disabled in tests
const originalStderrWrite = process.stderr.write.bind(process.stderr)
const originalStdoutWrite = process.stdout.write.bind(process.stdout)

const shouldSuppress = (message: string): boolean => {
	return (
		message.includes('NotSupportedError') ||
		message.includes('Failed to load iframe page') ||
		message.includes('Iframe page loading is disabled')
	)
}

process.stderr.write = ((chunk: any, encoding?: any, callback?: any): boolean => {
	const message = chunk.toString()

	if (shouldSuppress(message)) {
		if (typeof callback === 'function') {
			callback()
		} else if (typeof encoding === 'function') {
			encoding()
		}
		return true
	}

	return originalStderrWrite(chunk, encoding, callback)
}) as typeof process.stderr.write

process.stdout.write = ((chunk: any, encoding?: any, callback?: any): boolean => {
	const message = chunk.toString()

	if (shouldSuppress(message)) {
		if (typeof callback === 'function') {
			callback()
		} else if (typeof encoding === 'function') {
			encoding()
		}
		return true
	}

	return originalStdoutWrite(chunk, encoding, callback)
}) as typeof process.stdout.write
