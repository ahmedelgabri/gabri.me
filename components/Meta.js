// @flow
import React from 'react'
import Head from 'next/head'
import escape from '../lib/escape'
import data from '../data.json'

export default ({ post = null, pathname, children, ...rest }) => {
  const TITLE = post && post.attributes && post.attributes.title
    ? `${post.attributes.title} | ${data.author} - ${data.title}`
    : `${data.author} | ${data.title}`
  const DESC = post &&
    ((post.attributes && post.attributes.description) || post.body)
    ? `${escape(post.body.slice(0, 161))}...`
    : TITLE
  const IMG =
    (post && post.attributes && post.attributes.img) ||
    '/static/img/fb-image.png'
  const URL = pathname ? `${data.url}/blog/${pathname}` : data.url

  return (
    <Head>
      <title>{TITLE}</title>

      {/* G+ */}
      <meta itemprop="name" content={TITLE} />
      <meta itemprop="description" content={DESC} />
      <meta itemprop="image" content={IMG} />

      {/* FB Open Graph meta tags */}
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESC} />
      <meta property="og:url" content={URL} />
      <meta property="og:image" content={IMG} />
      <meta property="og:type" content={post ? 'article' : 'website'} />

      {/* twitter */}
      <meta name="twitter:url" content={URL} />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:image" content="/static/img/logo.svg" />
      {children}
    </Head>
  )
}
