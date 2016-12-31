import React, { PropTypes } from 'react'
import Link from 'react-router/Link'
import Helmet from 'react-helmet'

import config from '../../config.json'
import metadata from '../blog/metadata.json'
import Post from './Post'
import Footer from './Footer'

export default props =>
  <div>
    <Helmet title='BLOG' />
    <Link to='/'> HOME </Link>
    <pre>{JSON.stringify(props, null, 2)}</pre>
    {Object.keys(metadata).reverse().map(post => <div key={metadata[post].title}><Link to={`/blog/${post}`}>{metadata[post].title}</Link></div>)}
    <Link to='/blog/haha'>POST?!</Link>
    <Footer />
  </div>
