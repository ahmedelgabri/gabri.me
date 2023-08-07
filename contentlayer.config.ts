import {
	defineDocumentType,
	makeSource,
	ComputedFields,
} from 'contentlayer/source-files'
import {format, parseISO} from 'date-fns'
import truncate from 'lodash.truncate'
import strip from 'strip-markdown'
import readingTime from 'reading-time'
import {remark} from 'remark'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

const getProcessor = remark().use(strip).freeze()

async function stripMarkdown(md: string) {
	try {
		const file = await getProcessor.process(md)

		return file.contents
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(`Strip Markdown error: ${error}`)
		throw error
	}
}

const computedFields: ComputedFields = {
	readingTime: {type: 'json', resolve: (doc) => readingTime(doc.body.raw)},
	wordCount: {
		type: 'number',
		resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
	},
	tweetIds: {
		type: 'json',
		resolve: (doc) => {
			const tweetMatches = doc.body.raw.match(/<StaticTweet\sid="[0-9]+"\s\/>/g)
			const tweetIDs = tweetMatches?.map((tweet: string) => {
				const match = tweet.match(/[0-9]+/g)
				if (!match) return ''

				return match[0]
			})
			return tweetIDs ?? []
		},
	},
	slug: {
		type: 'string',
		resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx?$/, ''),
	},
	formattedDate: {
		type: 'string',
		resolve(doc) {
			return format(parseISO(doc.date), 'yyyy-MM-dd')
		},
	},
	excerpt: {
		type: 'string',
		async resolve(doc) {
			const raw = await stripMarkdown(doc.body.raw)
			const excerpt = truncate(raw, {length: 160})

			return excerpt
		},
	},
}

const Post = defineDocumentType(() => ({
	name: 'Post',
	contentType: 'mdx',
	filePathPattern: `blog/**/*.md`,
	fields: {
		title: {type: 'string', required: true},
		published: {type: 'boolean', required: true},
		date: {type: 'date', required: true},
		tags: {type: 'list', of: {type: 'string'}},
	},
	computedFields: {
		...computedFields,
		url: {
			type: 'string',
			resolve(doc) {
				return doc._raw.flattenedPath
			},
		},
	},
}))

const WeeklyLinks = defineDocumentType(() => ({
	name: 'WeeklyLinks',
	contentType: 'mdx',
	filePathPattern: `weekly-links/**/*.md`,
	fields: {
		title: {type: 'string', required: true},
		published: {type: 'boolean', required: true},
		date: {type: 'date', required: true},
		tags: {type: 'list', of: {type: 'string'}},
	},
	computedFields: {
		...computedFields,
		url: {
			type: 'string',
			resolve(doc) {
				return doc._raw.flattenedPath
			},
		},
	},
}))

export default makeSource({
	contentDirPath: 'src/_content',
	documentTypes: [Post, WeeklyLinks],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			rehypeCodeTitles,
			rehypePrism,
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ['anchor'],
					},
				},
			],
		],
	},
})
