import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import Link from 'react-router/Link'
import Helmet from 'react-helmet'

import data from '../data.json'
import Footer from '../components/Footer'

const favicon = require('../public/favicon.ico')

const Home = () => (
  <div>
    <h1 className='blue text-xl m0'>{data.author}</h1>
    <h2 className=' blue text-m normal leading-tight m0'>Browser whisperer, symbols writer & CLI typer</h2>
    <p> I like bringing structure where it is lacking, systematizing information & automating processes. </p>
    <p> A Developer with an eye for Design, builds for performance & clarity. Mainly focusing on front-end architecture & modular design systems. </p>
    <p> Currently working at <a href='http://lightspeedhq.com'>LightspeedHQ</a> in Amsterdam, The Netherlands. </p>
    <Link to='/blog'>BLOG!</Link>
    <Footer social={data.social} />
  </div>
)

const Blog = () => <div> <Helmet title='BLOG' /> Blog <Link to='/'> HOME </Link></div>

const App = () => {
  return (
    <Router>
      <div>
        <Helmet title={data.site_title} link={[{ rel: 'icon', href: 'favicon.png' }]} />
        <Match exactly pattern='/' component={Home} />
        <Match exactly pattern='/blog' component={Blog} />
      </div>
    </Router>
  )
}

render(<App />, document.querySelector('#App'))
