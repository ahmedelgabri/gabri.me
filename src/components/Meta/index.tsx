import * as React from 'react'
import Head from 'next/head'
import siteMeta from '../../config/siteMeta'

export interface Props {
	title: string
	url: string
	excerpt?: string
	post?: boolean
	img?: string
	children?: React.ReactNode
}

const {description, social, twitterId, siteUrl, author} = siteMeta

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

			{Object.entries(social).map(([, {url}]) => (
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
			{children}
		</Head>
	)
}
