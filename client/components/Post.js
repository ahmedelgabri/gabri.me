// @flow
import React from 'react'
import Miss from 'react-router/Miss'
import format from 'date-fns/format'

import metadata from '../blog/posts/metadata.json'

import Head from './Head'
import Back from './Back'
import Error from './Error'
import Contact from './Contact'
import Footer from './Footer'

export default props => {
  const post = metadata[props.params.post]
  if (!post) return (<Miss component={Error} />)

  return (
    <div>
      <Head post={post} pathname={props.pathname} />
      <Back />
      <h2>{post.attributes.title}</h2>
      <time>On {format(post.attributes.date, 'Do MMMM YYYY')}</time>
      <div dangerouslySetInnerHTML={{__html: post.__html}} />
      <Contact />
      <Footer />
    </div>
  )
}
