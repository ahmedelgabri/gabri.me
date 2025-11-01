import {defineCollection, z} from 'astro:content'

const blogSchema = z.object({
	title: z.string().max(99),
	published: z.boolean().default(true),
	date: z.coerce.date(),
	tags: z.array(z.string()).default([]),
	excerpt: z.string().optional(),
})

const posts = defineCollection({
	type: 'content',
	schema: blogSchema,
})

const weeklyLinks = defineCollection({
	type: 'content',
	schema: blogSchema,
})

export const collections = {posts, weeklyLinks}
