// @flow
import React from 'react'
import Helmet from 'react-helmet'
import escape from '../../helpers/escape'
import data from '../data.json'

const Head = ({post = {}, pathname, ...rest}) => {
  const TITLE = post.attributes && post.attributes.title
    ? `${post.attributes.title} | ${data.author} - ${data.title}`
    : `${data.author} | ${data.title}`
  const DESC = post.__html ? escape(post.__html) : TITLE
  const IMG = post.attributes && post.attributes.img || '/img/fb-image.png'
  const URL = pathname ? `${data.url}${pathname}` : data.url

  return (
    <Helmet
      title={TITLE}
      link={[
        {rel: 'canonical', href: URL}
      ]}
      meta={[
        {itemprop: 'name', content: TITLE},
        {itemprop: 'description', content: DESC},
        {itemprop: 'image', content: IMG},

        {itemprop: 'og:title', content: TITLE},
        {itemprop: 'og:description', content: DESC},
        {itemprop: 'og:url', content: URL},
        {itemprop: 'og:image', content: IMG},
        {itemprop: 'og:type', content: 'article'},

        {itemprop: 'twitter:title', content: TITLE},
        {itemprop: 'twitter:url', content: URL},
        {itemprop: 'twitter:image', content: '/img/logo.svg'}
      ]}
    />
  )
}

export default Head
