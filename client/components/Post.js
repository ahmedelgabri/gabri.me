import React, { PropTypes } from 'react'
import Link from 'react-router/Link'
import Helmet from 'react-helmet'

import config from '../../config.json'
import metadata from '../blog/metadata.json'
import Footer from './Footer'

export default props => {
  const post = {
    meta: metadata[props.params.post],
    content: require(`../blog/posts/${props.params.post}.md`)
  }

  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <div dangerouslySetInnerHTML={{__html: post.content}} />
      <Footer />
    </div>
  )
}
