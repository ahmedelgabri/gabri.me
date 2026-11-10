import {getCollection, getEntry, type CollectionEntry} from 'astro:content'
import {compareDesc, format} from 'date-fns'
import {generateExcerpt} from './excerpt'

export {generateExcerpt}

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

export interface BlogIndexItem {
	title: string
	date: string
	formattedDate: string
	/** Site-relative for the blog's own posts, absolute for external ones */
	url: string
	excerpt: string
	/** Set only on external posts, which link out instead of to /blog */
	source?: string
}

type BlogEntry = CollectionEntry<'blog'>
type WeeklyLinksEntry = CollectionEntry<'weeklyLinks'>
type ExternalPostEntry = CollectionEntry<'externalPosts'>
type TalkEntry = CollectionEntry<'talks'>

export interface TalkItem {
	title: string
	date: string
	formattedDate: string
	url: string
	slides?: string
}

function getSlugFromId(id: string): string {
	return id.replace(/\/post$/, '')
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

/* Newest first — the order every page that lists posts reads them in */
export function byDateDesc(a: {date: string}, b: {date: string}): number {
	return compareDesc(new Date(a.date), new Date(b.date))
}

export async function getAllPosts(): Promise<PostMetadata[]> {
	const entries = await getCollection('blog', isPublished)
	return entries.map((entry: BlogEntry) => entryToPostMetadata(entry, 'blog'))
}

/* Newest first, own and external posts interleaved by date */
export async function getBlogIndex(): Promise<BlogIndexItem[]> {
	const [posts, externalPosts] = await Promise.all([
		getAllPosts(),
		getCollection('externalPosts'),
	])
	const external = externalPosts.map(({data}: ExternalPostEntry) => ({
		...data,
		date: data.date.toISOString(),
		formattedDate: formatPostDate(data.date),
	}))
	return [...posts, ...external].sort(byDateDesc)
}

export async function getTalks(): Promise<TalkItem[]> {
	const entries = await getCollection('talks')
	return entries
		.map(({data}: TalkEntry) => ({
			...data,
			date: data.date.toISOString(),
			formattedDate: formatPostDate(data.date),
		}))
		.sort(byDateDesc)
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

interface SlugStaticPath {
	params: {slug: string}
}

export async function getBlogStaticPaths(): Promise<SlugStaticPath[]> {
	const entries = await getAllBlogEntries()
	return entries.map((entry) => ({
		params: {slug: getSlugFromId(entry.id)},
	}))
}
