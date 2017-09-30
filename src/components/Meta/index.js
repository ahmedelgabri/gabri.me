// @flow
import React from 'react'
import Helmet from 'react-helmet'

export default ({
  title,
  url,
  excerpt = title,
  post,
  img = '/img/fb-image.png',
  children,
}) => {
  return (
    <Helmet>
      <title>{title}</title>

      {/* G+ */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={excerpt} />
      <meta itemProp="image" content={img} />

      {/* FB Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={excerpt} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content={post ? 'article' : 'website'} />

      {/* twitter */}
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content="/img/logo.svg" />
      {children}
    </Helmet>
  )
}
