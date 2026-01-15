import manifest from './content-manifest.json'

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

const typedManifest = manifest as {
	posts: PostMetadata[]
	weeklyLinks: PostMetadata[]
	generatedAt: string
}

export async function getAllPosts(): Promise<PostMetadata[]> {
	return typedManifest.posts
}

export async function getAllWeeklyLinks(): Promise<PostMetadata[]> {
	return typedManifest.weeklyLinks
}

export async function getPostBySlug(
	slug: string,
	collection: 'blog' | 'weekly-links' = 'blog',
): Promise<PostMetadata | null> {
	const posts =
		collection === 'blog' ? typedManifest.posts : typedManifest.weeklyLinks
	return posts.find((post) => post.slug === slug) || null
}

export async function getAllContent(): Promise<PostMetadata[]> {
	return [...typedManifest.posts, ...typedManifest.weeklyLinks]
}
