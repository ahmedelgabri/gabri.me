import type {APIRoute} from 'astro'
import siteMeta from '../config/siteMeta'
import {getBlogIndex} from '../lib/content'
import {generateHomepageMarkdown, markdownResponse} from '../lib/markdown'

export const GET: APIRoute = async () => {
	const markdown = generateHomepageMarkdown(await getBlogIndex())
	return markdownResponse(markdown, siteMeta.siteUrl, '/index.md')
}
