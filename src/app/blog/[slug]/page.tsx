import * as React from 'react'
import type {Metadata} from 'next'
import Script from 'next/script'
import {allPosts, type Post} from 'contentlayer/generated'
import {pick} from 'contentlayer/client'
import {useMDXComponent} from 'next-contentlayer/hooks'
import Header from '../../../components/Header'
import Layout from '../../../components/Layout'
import Footer from '../../../components/Footer'
import TweetButton from '../../../components/TweetButton'
import H from '../../../components/Prose/H'
import siteMeta from '../../../config/siteMeta'
import MdxComponents from '../../../components/mdxComponents'

const {
	title,
	author,
	siteUrl,
	social: {
		twitter: {display},
	},
} = siteMeta

export async function generateStaticParams() {
	return allPosts.map((post) => post.url)
}

export const dynamicParams = false

export function generateMetadata({params}: PageProps<'slug'>): Metadata {
	const post = allPosts
		.map((p) =>
			pick(p, [
				'date',
				'excerpt',
				'title',
				'body',
				'formattedDate',
				'url',
				'slug',
			]),
		)
		.find((p) => p.slug === params.slug)

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

export default function Post({params}: PageProps<'slug'>) {
	const post = allPosts
		.map((p) =>
			pick(p, [
				'date',
				'excerpt',
				'title',
				'body',
				'formattedDate',
				'url',
				'slug',
			]),
		)
		.find((p) => p.slug === params.slug)

	if (!post) return null

	const {date, title, body, formattedDate, url} = post

	const postUrl = `${siteUrl}${url}`
	const Component = useMDXComponent(body.code)

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
				<div className="prose dark:prose-light">
					{/* @ts-ignore */}
					<Component components={MdxComponents} />
				</div>
				<div>
					<TweetButton via={display} title={title} url={postUrl} />
				</div>
				<Footer />
			</Layout>
		</>
	)
}
