import {getCollection, getEntry, type CollectionEntry} from 'astro:content'
import {format} from 'date-fns'

export interface PostMetadata {
	title: string
	date: string
	published: boolean
	tags: string[]
	excerpt: string
	slug: string
	url: string
	formattedDate: string
}

type BlogEntry = CollectionEntry<'blog'>
type WeeklyLinksEntry = CollectionEntry<'weeklyLinks'>

function getSlugFromId(id: string): string {
	return id.replace(/\/post$/, '')
}

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

function formatPostDate(date: Date): string {
	return format(date, 'yyyy-MM-dd')
}

function entryToPostMetadata(
	entry: BlogEntry | WeeklyLinksEntry,
	collection: 'blog' | 'weekly-links',
): PostMetadata {
	const slug = getSlugFromId(entry.id)
	const url = `/${collection}/${slug}`
	const date = entry.data.date
	const excerpt = entry.data.excerpt || generateExcerpt(entry.body)

	return {
		title: entry.data.title,
		date: date.toISOString(),
		published: entry.data.published,
		tags: entry.data.tags,
		excerpt,
		slug,
		url,
		formattedDate: formatPostDate(date),
	}
}

function isPublished(entry: {data: {published: boolean}}): boolean {
	return entry.data.published
}

export async function getAllPosts(): Promise<PostMetadata[]> {
	const entries = await getCollection('blog', isPublished)
	return entries.map((entry: BlogEntry) => entryToPostMetadata(entry, 'blog'))
}

export async function getAllWeeklyLinks(): Promise<PostMetadata[]> {
	const entries = await getCollection('weeklyLinks', isPublished)
	return entries.map((entry: WeeklyLinksEntry) =>
		entryToPostMetadata(entry, 'weekly-links'),
	)
}

export async function getPostBySlug(
	slug: string,
	collection: 'blog' | 'weekly-links' = 'blog',
): Promise<PostMetadata | null> {
	const id = `${slug}/post`
	const collectionName = collection === 'weekly-links' ? 'weeklyLinks' : 'blog'
	const entry = await getEntry(collectionName, id)

	if (!entry || !entry.data.published) {
		return null
	}

	return entryToPostMetadata(entry, collection)
}

export async function getAllContent(): Promise<PostMetadata[]> {
	const [posts, weeklyLinks] = await Promise.all([
		getAllPosts(),
		getAllWeeklyLinks(),
	])
	return [...posts, ...weeklyLinks]
}

export async function getBlogEntry(
	slug: string,
): Promise<BlogEntry | undefined> {
	const id = `${slug}/post`
	return getEntry('blog', id)
}

export async function getWeeklyLinksEntry(
	slug: string,
): Promise<WeeklyLinksEntry | undefined> {
	const id = `${slug}/post`
	return getEntry('weeklyLinks', id)
}

export async function getAllBlogEntries(): Promise<BlogEntry[]> {
	return getCollection('blog', isPublished)
}

export async function getAllWeeklyLinksEntries(): Promise<WeeklyLinksEntry[]> {
	return getCollection('weeklyLinks', isPublished)
}
