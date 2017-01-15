// @flow
import React from 'react'
import cxs from 'cxs'
import Miss from 'react-router/Miss'
import format from 'date-fns/format'

import metadata from '../blog/posts/metadata.json'

import Head from './Head'
import Back from './Back'
import Error from './Error'
import Contact from './Contact'
import Footer from './Footer'

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

export default props => {
  const post = metadata[props.params.post]
  if (!post) return (<Miss component={Error} />)

  return (
    <div>
      <Head post={post} pathname={props.pathname} />
      <Back />
      <div className={s.post}>
        <h2>{post.attributes.title}</h2>
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
