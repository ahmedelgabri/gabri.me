import * as React from 'react'
import type {Metadata} from 'next'
import Script from 'next/script'
import {posts} from '#site/content'
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
	return posts.map((post) => {
		return {slug: post.slug}
	})
}

export const dynamicParams = false

export async function generateMetadata({
	params,
}: PageProps<'slug'>): Promise<Metadata> {
	const slug = (await params).slug
	const post = posts.find((p) => p.slug === slug)

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
	const post = posts.find((p) => p.slug === slug)

	if (!post) return null

	const {date, title, body, formattedDate, url} = post

	const postUrl = `${siteUrl}${url}`

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
					On {formattedDate}
				</time>
				<div
					className="prose dark:prose-light"
					dangerouslySetInnerHTML={{__html: body}}
				/>
				<div>
					<TweetButton via={display} title={title} url={postUrl} />
				</div>
				<Footer />
			</Layout>
		</>
	)
}
