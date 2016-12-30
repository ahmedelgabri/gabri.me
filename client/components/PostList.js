import React, { Component } from 'react'
import Link from 'react-router/Link'
import Helmet from 'react-helmet'

import data from '../../data.json'
import Footer from './Footer'

export default props => {
  return (
    <div>
      <Helmet title='BLOG' />
      <Link to='/'> HOME </Link>
      Hi, I'm the blog!
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <Link to="/blog/haha">POST?!</Link>
      <Footer social={data.social} />
    </div>
  )
}
