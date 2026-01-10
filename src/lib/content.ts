import {promises as fs} from 'node:fs'
import path from 'node:path'
import {exec} from 'node:child_process'
import {promisify} from 'node:util'
import matter from 'gray-matter'
import {format, parseISO} from 'date-fns'
import {globby} from 'globby'

const execAsync = promisify(exec)

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
	raw: string
}

const CONTENT_DIR = path.join(process.cwd(), 'src/_content')

async function getGitTimestamp(filePath: string): Promise<string> {
	try {
		const {stdout} = await execAsync(`git log -1 --format=%cd "${filePath}"`)
		return new Date(stdout.trim() || Date.now()).toISOString()
	} catch {
		return new Date().toISOString()
	}
}

function generateExcerpt(content: string, maxLength = 160): string {
	const stripped = content
		.replace(/^---[\s\S]*?---/, '')
		.replace(/#+\s/g, '')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/[*_`]/g, '')
		.replace(/\n+/g, ' ')
		.trim()

	if (stripped.length <= maxLength) {
		return stripped
	}

	return stripped.slice(0, maxLength).trim() + '...'
}

async function parseMarkdownFile(filePath: string): Promise<PostMetadata> {
	const fileContent = await fs.readFile(filePath, 'utf-8')
	const {data, content} = matter(fileContent)

	const relativePath = path.relative(CONTENT_DIR, filePath)
	const slug = path.basename(filePath, path.extname(filePath))
	const isWeeklyLinks = relativePath.startsWith('weekly-links')
	const url = isWeeklyLinks ? `/weekly-links/${slug}` : `/blog/${slug}`

	const excerpt = data.excerpt || generateExcerpt(content)
	const updated = await getGitTimestamp(filePath)

	return {
		title: data.title || '',
		date: data.date || '',
		published: data.published !== false,
		tags: data.tags || [],
		excerpt,
		slug,
		url,
		formattedDate: format(parseISO(data.date), 'yyyy-MM-dd'),
		updated,
		filePath,
		raw: content,
	}
}

export async function getAllPosts(): Promise<PostMetadata[]> {
	const files = await globby([
		path.join(CONTENT_DIR, 'blog/**/*.md'),
		path.join(CONTENT_DIR, 'blog/**/*.mdx'),
	])

	const posts = await Promise.all(files.map(parseMarkdownFile))
	return posts.filter((post) => post.published)
}

export async function getAllWeeklyLinks(): Promise<PostMetadata[]> {
	const files = await globby([
		path.join(CONTENT_DIR, 'weekly-links/**/*.md'),
		path.join(CONTENT_DIR, 'weekly-links/**/*.mdx'),
	])

	const posts = await Promise.all(files.map(parseMarkdownFile))
	return posts.filter((post) => post.published)
}

export async function getPostBySlug(
	slug: string,
	collection: 'blog' | 'weekly-links' = 'blog',
): Promise<PostMetadata | null> {
	const files = await globby([
		path.join(CONTENT_DIR, `${collection}/${slug}.md`),
		path.join(CONTENT_DIR, `${collection}/${slug}.mdx`),
	])

	if (files.length === 0) {
		return null
	}

	return parseMarkdownFile(files[0])
}

export async function getAllContent(): Promise<PostMetadata[]> {
	const [posts, weeklyLinks] = await Promise.all([
		getAllPosts(),
		getAllWeeklyLinks(),
	])

	return [...posts, ...weeklyLinks]
}
