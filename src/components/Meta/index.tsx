import * as React from 'react'
import Head from 'next/head'
import meta from '../../config/meta'

export interface Props {
	title: string
	url: string
	excerpt?: string
	post?: boolean
	img?: string
	children?: React.ReactChild
}

const {
	description,
	social: {twitter, github, linkedin},
	twitterId,
	siteUrl,
	author,
} = meta

const {url: twitterUrl} = twitter

export default function Meta({
	title,
	url,
	excerpt,
	post,
	img,
	children,
}: Props) {
	const socialImg = `${siteUrl}/img/fb-image.jpg`

	return (
		<Head>
			<title>{title}</title>
			<meta
				key="description"
				name="description"
				content={excerpt || description}
			/>
			<meta name="author" content={author} />
			<meta key="og:url" property="og:url" content={url} />
			<meta key="og:image" property="og:image" content={img || socialImg} />
			<meta
				key="og:type"
				property="og:type"
				content={post ? 'article' : 'website'}
			/>
			<meta key="twitter:title" name="twitter:title" content={title} />
			<meta
				key="twitter:description"
				name="twitter:description"
				content={excerpt || description}
			/>
			<meta key="application-name" name="application-name" content="Gabri.me" />

			{[twitter, github, linkedin].map(({url}) => (
				<link key={url} href={url} rel="me" />
			))}

			<link
				// @ts-ignore
				name="msapplication-TileImage"
				href="/img/ms-logo.png"
			/>
			<link
				// @ts-ignore
				name="msapplication-TileColor"
				content="#1f2325"
			/>
			<meta key="theme-color" name="theme-color" content="#1f2325" />
			<link
				rel="apple-touch-icon-precomposed"
				sizes="114x114"
				href="apple-touch-icon-114x114-precomposed.png"
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="72x72"
				href="apple-touch-icon-72x72-precomposed.png"
			/>
			<link
				rel="apple-touch-icon-precomposed"
				href="apple-touch-icon-57x57-precomposed.png"
			/>
			<meta
				key="apple-mobile-web-app-title"
				name="apple-mobile-web-app-title"
				content="Gabri.me"
			/>
			<meta
				key="twitter:account_id"
				property="twitter:account_id"
				content={twitterId}
			/>
			<meta
				key="twitter:card"
				name="twitter:card"
				content="summary_large_image"
			/>
			<meta key="twitter:creator" name="twitter:creator" content={twitterUrl} />
			<meta key="twitter:domain" name="twitter:domain" content={siteUrl} />
			{children}
		</Head>
	)
}
