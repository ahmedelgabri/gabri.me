import {defineCollection} from 'astro:content'
import {file, glob} from 'astro/loaders'
import {z} from 'astro/zod'

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

/* Articles written for other publications, listed with the blog's own posts */
const externalPosts = defineCollection({
	loader: file('src/_content/external-posts.yaml'),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		url: z.url(),
		source: z.string(),
		excerpt: z.string(),
	}),
})

const talks = defineCollection({
	loader: file('src/_content/talks.yaml'),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		url: z.url(),
		slides: z.url().optional(),
	}),
})

const projects = defineCollection({
	loader: file('src/_content/projects.yaml'),
	schema: z.object({
		order: z.number().int(),
		url: z.url(),
		description: z.string(),
	}),
})

export const collections = {blog, weeklyLinks, externalPosts, talks, projects}
