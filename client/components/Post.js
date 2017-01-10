import React, { PropTypes } from 'react'
import Miss from 'react-router/Miss'
import Link from 'react-router/Link'
import Helmet from 'react-helmet'

import metadata from '../blog/posts/metadata.json'
import config from '../../config.json'
import Footer from './Footer'
import Error from './Error'


export default props => {
  const post = metadata[props.params.post]

  if (!post) return (<Miss component={Error} />)

  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <h2>{post.attributes.title}</h2>
      <time>On {post.attributes.date}</time>
      <div dangerouslySetInnerHTML={{__html: post.__html}} />
      <Footer />
    </div>
  )
}
