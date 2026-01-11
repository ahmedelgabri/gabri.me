import * as React from 'react'
import type {Metadata} from 'next'
import {getAllPosts, getPostBySlug} from '../../../lib/content'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import TweetButton from '../../../components/TweetButton'
import H from '../../../components/Prose/H'
import siteMeta from '../../../config/siteMeta'

const {
	siteUrl,
	social: {
		twitter: {display: twitterDisplay},
	},
} = siteMeta

export async function generateStaticParams() {
	const posts = await getAllPosts()
	return posts.map((post) => ({
		slug: post.slug,
	}))
}

export const dynamicParams = false

export async function generateMetadata({
	params,
}: PageProps<'slug'>): Promise<Metadata> {
	const slug = (await params).slug
	const post = await getPostBySlug(slug, 'blog')

	if (!post) return {}

	const {excerpt, title, url} = post

	return {
		title,
		description: excerpt,
		openGraph: {
			title,
			url,
			type: 'article',
		},
		alternates: {
			canonical: url,
		},
		twitter: {
			title,
			description: excerpt,
			// @ts-ignore
			domain: url,
		},
	}
}

export default async function Post({params}: PageProps<'slug'>) {
	const slug = (await params).slug
	const post = await getPostBySlug(slug, 'blog')

	if (!post) return null

	const {date, title, formattedDate, url} = post
	const postUrl = `${siteUrl}${url}`

	const MDXContent = (await import(`../../../_content/blog/${slug}/post.mdx`))
		.default

	return (
		<>
			<Header slug={slug} />

			<article>
				<header className="mb-8">
					<H level="1">{title}</H>
					<time className="text-sm text-neutral-500" dateTime={date}>
						<i className="i-tabler:calendar mr-1 inline-block align-[-2px]" />
						{formattedDate}
					</time>
				</header>

				<div className="prose">
					<MDXContent />
				</div>

				<TweetButton via={twitterDisplay} title={title} url={postUrl} />
			</article>

			<Footer />
		</>
	)
}
