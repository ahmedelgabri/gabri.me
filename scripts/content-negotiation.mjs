function parseAccept(accept) {
	return accept.split(',').map((part) => {
		const [mediaType, ...parameters] = part.trim().toLowerCase().split(';')
		const qualityParameter = parameters.find((parameter) =>
			parameter.trim().startsWith('q='),
		)
		const parsedQuality = qualityParameter
			? Number(qualityParameter.trim().slice(2))
			: 1

		return {
			mediaType,
			quality:
				Number.isFinite(parsedQuality) && parsedQuality >= 0
					? Math.min(parsedQuality, 1)
					: 0,
		}
	})
}

function qualityFor(ranges, target) {
	const [targetType] = target.split('/')
	let bestSpecificity = -1
	let quality = 0

	for (const range of ranges) {
		let specificity = -1
		if (range.mediaType === target) specificity = 2
		else if (range.mediaType === `${targetType}/*`) specificity = 1
		else if (range.mediaType === '*/*') specificity = 0

		if (specificity > bestSpecificity) {
			bestSpecificity = specificity
			quality = range.quality
		} else if (specificity === bestSpecificity) {
			quality = Math.max(quality, range.quality)
		}
	}

	return quality
}

export function acceptsMarkdown(accept) {
	if (!accept) return false

	const ranges = parseAccept(accept)
	const explicitMarkdown = ranges
		.filter((range) => range.mediaType === 'text/markdown')
		.reduce((quality, range) => Math.max(quality, range.quality), 0)

	return (
		explicitMarkdown > 0 && explicitMarkdown >= qualityFor(ranges, 'text/html')
	)
}

export function markdownPathFor(pathname) {
	if (pathname === '/') return '/index.md'
	if (/^\/blog\/[^/]+$/.test(pathname) && !pathname.endsWith('.md')) {
		return `${pathname}.md`
	}
	return null
}

export function htmlPathFor(pathname) {
	if (pathname === '/index.md') return '/'
	const match = pathname.match(/^\/blog\/([^/]+)\.md$/)
	return match ? `/blog/${match[1]}` : null
}
