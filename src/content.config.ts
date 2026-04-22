import {defineCollection, z} from 'astro:content'
import {glob} from 'astro/loaders'

const postSchema = z.object({
	title: z.string(),
	date: z.coerce.date(),
	published: z.boolean().default(true),
	tags: z.array(z.string()).default([]),
	excerpt: z.string().optional(),
})

const blog = defineCollection({
	loader: glob({pattern: '**/post.mdx', base: './src/_content/blog'}),
	schema: postSchema,
})

const weeklyLinks = defineCollection({
	loader: glob({pattern: '**/post.mdx', base: './src/_content/weekly-links'}),
	schema: postSchema,
})

export const collections = {blog, weeklyLinks}
