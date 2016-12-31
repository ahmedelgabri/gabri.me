import React, { PropTypes } from 'react'
import Link from 'react-router/Link'
// import Helmet from 'react-helmet'

import config from '../config.json'
import Footer from './components/Footer'

export default () => (
  <div>
    <h1 className='teal text-xl m0'>{config.author}</h1>
    <h2 className=' teal text-m normal leading-tight m0'>Browser whisperer, symbols writer & CLI typer</h2>
    <p> I like bringing structure where it is lacking, systematizing information & automating processes. </p>
    <p> A Developer with an eye for Design, builds for performance & clarity. Mainly focusing on front-end architecture & modular design systems. </p>
    <p> Currently working at <a href='http://lightspeedhq.com'>LightspeedHQ</a> in Amsterdam, The Netherlands. </p>
    <Link to='/blog'>BLOG!</Link>
    <Footer />
  </div>
)

