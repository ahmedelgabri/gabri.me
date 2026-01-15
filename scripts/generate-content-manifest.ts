#!/usr/bin/env node
/**
 * Generates a static manifest of all content metadata.
 * This avoids dynamic imports and MDX processing at runtime.
 */

import {execSync} from 'node:child_process'
import fs, {globSync} from 'node:fs'
import path from 'node:path'

export function formatDate(dateStr: string): string {
	const date = new Date(dateStr)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

export interface PostMetadata {
	title: string
	date: string
	published: boolean
	tags: string[]
	excerpt: string
	slug: string
	url: string
	formattedDate: string
	updated: string
	filePath: string
}

export const CONTENT_DIR = path.join(process.cwd(), 'src/_content')
export const OUTPUT_FILE = path.join(
	process.cwd(),
	'src/lib/content-manifest.json',
)

export function getGitTimestamp(filePath: string): string {
	try {
		const stdout = execSync(
			`git log -1 --format=%cd --date=iso-strict -- "${filePath}"`,
			{
				encoding: 'utf-8',
			},
		)
		return new Date(stdout.trim() || Date.now()).toISOString()
	} catch {
		return new Date().toISOString()
	}
}

export function generateExcerptFromMdx(
	content: string,
	maxLength = 160,
): string {
	const stripped = content
		.replace(/^export const metadata = \{[\s\S]*?\}\n+/, '')
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

export function extractMetadata(content: string): Record<string, unknown> {
	// Match the metadata export: export const metadata = { ... }
	const match = content.match(/export const metadata = (\{[\s\S]*?\n\})/)
	if (!match) {
		return {}
	}

	try {
		// Use Function constructor to safely evaluate the object literal
		// This handles trailing commas and other JS syntax that JSON.parse can't
		const fn = new Function(`return ${match[1]}`)
		return fn() as Record<string, unknown>
	} catch {
		console.warn('Failed to parse metadata')
		return {}
	}
}

export function parseMdxFile(filePath: string): PostMetadata {
	const content = fs.readFileSync(filePath, 'utf-8')
	const relativePath = path.relative(CONTENT_DIR, filePath)
	const slug = path.basename(path.dirname(filePath))
	const isWeeklyLinks = relativePath.startsWith('weekly-links')
	const url = isWeeklyLinks ? `/weekly-links/${slug}` : `/blog/${slug}`

	const metadata = extractMetadata(content)

	let excerpt = metadata.excerpt as string | undefined
	if (!excerpt) {
		excerpt = generateExcerptFromMdx(content)
	}

	const updated = getGitTimestamp(filePath)
	const date = (metadata.date as string) || ''

	return {
		title: (metadata.title as string) || '',
		date,
		published: metadata.published !== false,
		tags: (metadata.tags as string[]) || [],
		excerpt,
		slug,
		url,
		formattedDate: date ? formatDate(date) : '',
		updated,
		filePath,
	}
}

export function generateManifest() {
	const blogFiles = globSync(path.join(CONTENT_DIR, 'blog/**/*.mdx'))
	const weeklyLinksFiles = globSync(
		path.join(CONTENT_DIR, 'weekly-links/**/*.mdx'),
	)

	const posts = blogFiles.map(parseMdxFile).filter((post) => post.published)
	const weeklyLinks = weeklyLinksFiles
		.map(parseMdxFile)
		.filter((post) => post.published)

	const manifest = {
		posts,
		weeklyLinks,
		generatedAt: new Date().toISOString(),
	}

	fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, '\t'))
	console.log(
		`Generated content manifest with ${posts.length} posts and ${weeklyLinks.length} weekly links`,
	)
}

// Run when executed directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`
if (isMainModule) {
	generateManifest()
}
