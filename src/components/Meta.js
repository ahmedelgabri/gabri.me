// @flow
import React from 'react'
import Helmet from 'react-helmet'
import escape from '../utils/escape'

export default ({ post = null, children, author, siteTitle, url }) => {
  const TITLE =
    post && post.title
      ? `${post.title} | ${author} - ${siteTitle}`
      : `${author} | ${siteTitle}`
  const DESC =
    post && post.html ? `${escape(post.html.slice(0, 161))}...` : TITLE
  const IMG = (post && post.img) || '/img/fb-image.png'

  return (
    <Helmet>
      <title>
        {TITLE}
      </title>

      {/* G+ */}
      <meta itemProp="name" content={TITLE} />
      <meta itemProp="description" content={DESC} />
      <meta itemProp="image" content={IMG} />

      {/* FB Open Graph meta tags */}
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESC} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={IMG} />
      <meta property="og:type" content={post ? 'article' : 'website'} />

      {/* twitter */}
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:image" content="/img/logo.svg" />
      {children}
    </Helmet>
  )
}
