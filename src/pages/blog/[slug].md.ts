import type {APIRoute, GetStaticPaths} from 'astro'
import logoLight from '../../assets/logo-light.svg'
import siteMeta from '../../config/siteMeta'
import {getBlogEntry, getBlogStaticPaths} from '../../lib/content'
import {generateBlogPostMarkdown, markdownResponse} from '../../lib/markdown'

export const getStaticPaths: GetStaticPaths = getBlogStaticPaths

export const GET: APIRoute = async ({params}) => {
	const {slug} = params
	const entry = await getBlogEntry(slug!)

	if (!entry || !entry.data.published) {
		return new Response('Not found', {status: 404})
	}

	const markdownPath = `/blog/${slug}.md`
	const canonicalUrl = `${siteMeta.siteUrl}/blog/${slug}`
	const logoUrl = new URL(
		typeof logoLight === 'string' ? logoLight : logoLight.src,
		siteMeta.siteUrl,
	).href
	const markdown = generateBlogPostMarkdown(
		{
			title: entry.data.title,
			date: entry.data.date,
			tags: entry.data.tags,
			body: entry.body,
			slug: slug!,
		},
		{assets: {light: logoUrl}},
	)

	return markdownResponse(markdown, canonicalUrl, markdownPath)
}
