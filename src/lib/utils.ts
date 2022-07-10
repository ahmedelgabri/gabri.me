import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import {remark} from 'remark'
import strip from 'strip-markdown'
import truncate from 'lodash.truncate'
import {globby} from 'globby'

const root = process.cwd()
const postsDirectory = path.resolve(root, './src/_content/blog')
// const weeklyLinks = `${postsDirectory}/weekly-links`

const getProcessor = remark().use(strip).freeze()

async function stripMarkdown(md: string): Promise<string> {
	try {
		const file = await getProcessor.process(md)

		return file.contents
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(`Strip Markdown error: ${error}`)
		throw error
	}
}

export async function getPostsSlugs(): Promise<string[]> {
	return (await globby([`${postsDirectory}/*.{md,mdx}`])).map((p) =>
		path.basename(path.basename(p, '.mdx'), '.md'),
	)
}

type PostData = {
	title: string
	content: string
	excerpt: string
	slug: string
	date: string
}

export async function getPostBySlug(slug: string): Promise<PostData> {
	const realSlug = slug.replace(/\.mdx?$/, '')
	// Markdown is the default
	let fullPath = path.join(postsDirectory, `${realSlug}.md`)

	// add support to .mdx extention
	// All files will be compiled as .mdx anyway
	try {
		const filePath = path.join(postsDirectory, `${realSlug}.mdx`)
		if (fs.statSync(filePath).isFile()) {
			fullPath = filePath
		}
	} catch (e) {}

	const fileContents = fs.readFileSync(fullPath, 'utf8')
	const {data, content} = matter(fileContents)
	const raw = await stripMarkdown(content)
	const excerpt = truncate(raw, {length: 160})

	return {
		...data,
		content,
		excerpt,
		slug: `/blog/${realSlug}`,
	} as PostData
}

export async function getAllPosts(): Promise<PostData[]> {
	const slugs = await getPostsSlugs()
	const posts = await Promise.all(
		slugs.map(async (slug) => await getPostBySlug(slug)),
	)

	return posts.sort(
		({date: a}, {date: b}) => new Date(b).getTime() - new Date(a).getTime(),
	)
}
