/**
 * Generates a plain text excerpt from markdown/MDX content.
 * Strips frontmatter, imports, markdown syntax, and HTML tags.
 */
export function generateExcerpt(
	body: string | undefined,
	maxLength = 160,
): string {
	if (!body) return ''

	const stripped = body
		.replace(/^---[\s\S]*?---\n*/, '')
		.replace(/import\s+.*?from\s+['"].*?['"]\n*/g, '')
		.replace(/#+\s/g, '')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/<[^>]+>/g, '')
		.replace(/[*_`]/g, '')
		.replace(/\n+/g, ' ')
		.trim()

	if (stripped.length <= maxLength) {
		return stripped
	}

	return stripped.slice(0, maxLength).trim() + '...'
}
