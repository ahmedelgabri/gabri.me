// @flow
import React from 'react'
import cxs from 'cxs'
import format from 'date-fns/format'
import Meta from './Meta'
import Back from './Back'
import Footer from './Footer'
import TweetButton from './TweetButton'

// import 'highlight.js/styles/gruvbox-dark.css'

const s = {
  post: cxs({
    borderBottom: '1px solid rgba(0, 0, 0, .1)'
  }),
  contact: cxs({
    marginBottom: '1rem',
    paddingBottom: '1rem',
    paddingTop: '1rem'
  })
}

export default (props) => {
  const { post, slug } = props

  return (
    <div>
      <Meta post={post} pathname={slug}>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/gruvbox-dark.min.css' />
      </Meta>
      <Back />
      <div className={s.post}>
        <h1>{post.attributes.title}</h1>
        <time>On {format(post.attributes.date, 'Do MMMM YYYY')}</time>
        <div dangerouslySetInnerHTML={{__html: post.__html}} />
      </div>
      <div className={s.contact}>
        <TweetButton title={post.attributes.title} slug={slug} />
      </div>
      <Footer />
    </div>
  )
}
