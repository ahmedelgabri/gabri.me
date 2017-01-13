import React, { PropTypes } from 'react'
import Miss from 'react-router/Miss'
import Link from 'react-router/Link'
import Helmet from 'react-helmet'

import metadata from '../blog/posts/metadata.json'
import data from '../data.json'

import Back from './Back'
import Error from './Error'
import Contact from './Contact'
import Footer from './Footer'

export default props => {
  const post = metadata[props.params.post]

  if (!post) return (<Miss component={Error} />)

  return (
    <div>
      <Back />
      <h2>{post.attributes.title}</h2>
      <time>On {post.attributes.date}</time>
      <div dangerouslySetInnerHTML={{__html: post.__html}} />
      <Footer />
    </div>
  )
}
