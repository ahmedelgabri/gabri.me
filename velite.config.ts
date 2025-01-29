import {exec} from 'node:child_process'
import {promisify} from 'node:util'
import path from 'node:path'
import {defineCollection, defineConfig, s} from 'velite'
import {format, parseISO} from 'date-fns'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

const execAsync = promisify(exec)

const timestamp = () =>
	s
		.custom<string | undefined>((i) => i === undefined || typeof i === 'string')
		.transform<string>(async (value, {meta, addIssue}) => {
			if (value != null) {
				addIssue({
					fatal: false,
					code: 'custom',
					message:
						'`s.timestamp()` schema will resolve the value from `git log -1 --format=%cd`',
				})
			}
			const {stdout} = await execAsync(`git log -1 --format=%cd ${meta.path}`)
			return new Date(stdout.trim() || Date.now()).toISOString()
		})

const schema = s
	.object({
		title: s.string().max(99),
		published: s.boolean().default(true),
		date: s.isodate(),
		updated: timestamp(),
		raw: s.raw(),
		body: s.markdown({
			copyLinkedFiles: false,
			rehypePlugins: [
				rehypeSlug,
				rehypeCodeTitles,
				[
					rehypePrism,
					{
						defaultLanguage: 'txt',
					},
				],
				[
					rehypeAutolinkHeadings,
					{
						properties: {
							className: ['anchor'],
						},
					},
				],
			],
		}),
		metadata: s.metadata(),
		url: s.path(),
		tags: s.array(s.string()).default([]),
		excerpt: s.excerpt(),
	})
	.transform((data, _ctx) => {
		const tweetMatches = data.raw.match(/<StaticTweet\sid="[0-9]+"\s\/>/g)
		const tweetIds = tweetMatches?.map((tweet: string) => {
			const match = tweet.match(/[0-9]+/g)
			if (!match) return ''

			return match[0]
		})

		return {
			...data,
			tweetIds,
			slug: path.basename(data.url),
			formattedDate: format(parseISO(data.date), 'yyyy-MM-dd'),
		}
	})

const posts = defineCollection({
	name: 'Post',
	pattern: `blog/**/*.md`,
	schema,
})

const weeklyLinks = defineCollection({
	name: 'WeeklyLinks',
	pattern: `weekly-links/**/*.md`,
	schema,
})

export default defineConfig({
	root: 'src/_content',
	collections: {posts, weeklyLinks},
})
