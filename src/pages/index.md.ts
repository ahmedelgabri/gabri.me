import type {APIRoute} from 'astro'
import siteMeta from '../config/siteMeta'
import {getBlogIndex, getTalks} from '../lib/content'
import {generateHomepageMarkdown, markdownResponse} from '../lib/markdown'

export const GET: APIRoute = async () => {
	const markdown = generateHomepageMarkdown(
		await getBlogIndex(),
		await getTalks(),
	)
	return markdownResponse(markdown, siteMeta.siteUrl, '/index.md')
}
