import {format} from 'date-fns'
import siteMeta from '../config/siteMeta'
import {role, summary, talkItems} from './homepage'
import type {PostMetadata} from './content'

interface MarkdownPost {
	title: string
	date: Date
	tags: string[]
	body: string
	slug: string
}

interface MarkdownBodyOptions {
	assets?: Record<string, string>
}

const fencePattern = /^\s*(`{3,}|~{3,})/
const contactLabels: Record<string, string> = {
	github: 'GitHub',
	linkedin: 'LinkedIn',
	twitter: 'Twitter',
	email: 'Email',
}

/** Removes MDX-only imports and converts the components used by posts into Markdown. */
export function mdxBodyToMarkdown(
	body: string,
	{assets = {}}: MarkdownBodyOptions = {},
): string {
	const output: string[] = []
	let fence: string | null = null

	for (const line of body.split('\n')) {
		const fenceMatch = line.match(fencePattern)
		if (fenceMatch) {
			const marker = fenceMatch[1]
			if (!fence) {
				fence = marker[0]
			} else if (marker[0] === fence) {
				fence = null
			}
			output.push(line)
			continue
		}

		if (fence) {
			output.push(line)
			continue
		}

		if (/^\s*import\s/.test(line) || /^\s*<\/?center>\s*$/.test(line)) {
			continue
		}

		const tweet = line.match(/^\s*<Tweet\s+id=["'](\d+)["']\s*\/>\s*$/)
		if (tweet) {
			const url = `https://x.com/i/status/${tweet[1]}`
			output.push(`[View this post on X](${url})`)
			continue
		}

		const image = line.match(/^\s*<Image\s+(.+?)\s*\/>\s*$/)
		if (image) {
			const attributes = image[1]
			if (/class=["'][^"']*zj-only-dark/.test(attributes)) {
				continue
			}

			const source = attributes.match(/src=\{([A-Za-z_$][\w$]*)\}/)?.[1]
			const alt = attributes.match(/alt=["']([^"']*)["']/)?.[1] || 'Image'
			if (source && assets[source]) {
				output.push(`![${alt}](${assets[source]})`)
				continue
			}
		}

		output.push(
			line
				.replace(/\bclassName=/g, 'class=')
				.replace(/\s+style=\{\{[^}]*\}\}/g, ''),
		)
	}

	return output.join('\n').trim()
}

export function generateBlogPostMarkdown(
	post: MarkdownPost,
	options?: MarkdownBodyOptions,
): string {
	const canonicalUrl = `${siteMeta.siteUrl}/blog/${post.slug}`
	const metadata = [
		`# ${post.title}`,
		'',
		`Published: ${format(post.date, 'yyyy-MM-dd')}`,
		`Canonical: ${canonicalUrl}`,
	]

	if (post.tags.length > 0) {
		metadata.push(`Tags: ${post.tags.join(', ')}`)
	}

	return [...metadata, '', mdxBodyToMarkdown(post.body, options), ''].join('\n')
}

export function generateHomepageMarkdown(posts: PostMetadata[]): string {
	const {author, siteUrl, social, projects} = siteMeta
	const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))
	const lines = [
		`# ${author}`,
		'',
		`> ${siteMeta.description}`,
		'',
		'## About',
		'',
		summary,
		'',
		`${role.title} at [${role.company}](${role.companyUrl}), ${role.location}.`,
		'',
		'## Contact',
		'',
		...Object.entries(social).map(
			([name, entry]) =>
				`- ${contactLabels[name] || name}: [${entry.display}](${entry.url})`,
		),
		'',
		'## Projects',
		'',
		...projects.map(
			(project) =>
				`- [${project.name}](${project.url}): ${project.description}`,
		),
		'',
		'## Blog',
		'',
		...sortedPosts.map(
			(post) =>
				`- ${post.formattedDate}: [${post.title}](${siteUrl}${post.url})`,
		),
		'',
		'## Talks & Interviews',
		'',
		...talkItems.map(
			(item) =>
				`- ${item.date}: [${item.title}](${item.url})${item.slides ? ` ([slides](${item.slides}))` : ''}`,
		),
		'',
	]

	return lines.join('\n')
}

export function markdownResponse(
	markdown: string,
	canonicalUrl: string,
	markdownPath: string,
): Response {
	return new Response(markdown, {
		headers: {
			'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
			'Content-Location': markdownPath,
			'Content-Type': 'text/markdown; charset=utf-8',
			Link: `<${canonicalUrl}>; rel="canonical"; type="text/html"`,
			Vary: 'Accept',
		},
	})
}
