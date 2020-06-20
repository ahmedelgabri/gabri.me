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

export default function Meta({
  title,
  url,
  excerpt,
  post,
  img,
  children,
}: Props) {
  const {
    description,
    social: {
      twitter: {url: twitterUrl},
    },
    twitterId,
    siteUrl,
  } = meta
  const socialImg = `${siteUrl}/img/fb-image.jpg`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={excerpt || description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img || socialImg} />
      <meta property="og:type" content={post ? 'article' : 'website'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={excerpt || description} />
      <meta name="application-name" content="Gabri.me" />

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
      <meta name="theme-color" content="#1f2325" />
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
      <meta name="apple-mobile-web-app-title" content="Gabri.me" />
      <meta property="twitter:account_id" content={twitterId} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUrl} />
      <meta name="twitter:domain" content={siteUrl} />
      {children}
    </Head>
  )
}
