import * as React from 'react'
import type {Metadata} from 'next'
import Script from 'next/script'
import {getAllPosts, getPostBySlug} from '../../../lib/content'
import Header from '../../../components/Header'
import Layout from '../../../components/Layout'
import Footer from '../../../components/Footer'
import TweetButton from '../../../components/TweetButton'
import H from '../../../components/Prose/H'
import siteMeta from '../../../config/siteMeta'

const {
	siteUrl,
	social: {
		twitter: {display},
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

	const MDXContent = (await import(`../../../_content/blog/${slug}.mdx`))
		.default

	return (
		<>
			<Script
				strategy="lazyOnload"
				src="https://platform.twitter.com/widgets.js"
			/>
			<Layout>
				<Header />
				<H level="2">{title}</H>
				<time
					className="mb-12 block font-mono text-sm italic text-gray-500"
					dateTime={date}
				>
					<i className="i-tabler:calendar align-[-2px]" /> {formattedDate}
				</time>
				<div className="prose dark:prose-light">
					<MDXContent />
				</div>
				<div>
					<TweetButton via={display} title={title} url={postUrl} />
				</div>
				<Footer />
			</Layout>
		</>
	)
}
