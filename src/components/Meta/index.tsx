import * as React from 'react'
import Helmet from 'react-helmet'
import {useStaticQuery, graphql} from 'gatsby'
import msTile from '../../../static/img/ms-logo.png'
import appleIcon57 from '../../../static/apple-touch-icon-57x57-precomposed.png'
import appleIcon72 from '../../../static/apple-touch-icon-72x72-precomposed.png'
import appleIcon114 from '../../../static/apple-touch-icon-114x114-precomposed.png'

export interface Props {
	title: string
	url: string
	excerpt?: string
	post?: boolean
	img?: string
	children?: React.ReactChild
}

export default function Meta({
	title,
	url,
	excerpt,
	post,
	img,
	children,
}: Props) {
	const {
		site: {
			siteMetadata: {
				description,
				social: {
					twitter: {url: twitterUrl},
				},
				twitterId,
				siteUrl,
			},
		},
	} = useStaticQuery(graphql`
		query HeadingQuery {
			site {
				siteMetadata {
					description
					social {
						twitter {
							url
						}
					}
					twitterId
					siteUrl
				}
			}
		}
	`)
	const socialImg = `${siteUrl}/img/fb-image.jpg`

	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={excerpt || description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={img || socialImg} />
			<meta property="og:type" content={post ? 'article' : 'website'} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={excerpt || description} />

			<meta name="application-name" content="Gabri.me" />
			<link name="msapplication-TileImage" href={msTile} />
			<link name="msapplication-TileColor" content="#1f2325" />
			<meta name="theme-color" content="#1f2325" />

			<link
				rel="apple-touch-icon-precomposed"
				sizes="114x114"
				href={appleIcon114}
			/>
			<link
				rel="apple-touch-icon-precomposed"
				sizes="72x72"
				href={appleIcon72}
			/>
			<link rel="apple-touch-icon-precomposed" href={appleIcon57} />
			<meta name="apple-mobile-web-app-title" content="Gabri.me" />
			<meta property="twitter:account_id" content={twitterId} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:creator" content={twitterUrl} />
			<meta name="twitter:domain" content={siteUrl} />

			{children}
		</Helmet>
	)
}
