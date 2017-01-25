// @flow
import React from 'react'
import cxs from 'cxs'
import Head from 'next/head'
import format from 'date-fns/format'
import Meta from './Meta'
import Back from './Back'
import Contact from './Contact'
import Footer from './Footer'
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
      <Meta post={post} pathname={slug} />
      <Back />
      <div className={s.post}>
        <h1>{post.attributes.title}</h1>
        <time>On {format(post.attributes.date, 'Do MMMM YYYY')}</time>
        <div dangerouslySetInnerHTML={{__html: post.__html}} />
      </div>
      <div className={s.contact}>
        <Contact />
      </div>
      <Footer />
    </div>
  )
}
