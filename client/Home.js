import React, { PropTypes } from 'react'
import Link from 'react-router/Link'
import cxs from 'cxs'
// import Helmet from 'react-helmet'

import data from './data.json'
import colors from './colors'
import PostList from './components/PostList'
import Contact from './components/Contact'
import Footer from './components/Footer'

const s = {
  wrap: cxs({
    borderBottom: '1px solid',
    paddingBottom: '1rem',
    marginBottom: '1rem'
  }),
  h1: cxs({
    color: colors.teal,
    fontSize: '3rem',
    margin: 0
  }),
  h2: cxs({
    color: colors.teal,
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'normal',
    lineHeight: 1.2
  })
}

export default () =>
  <div>
    <div className={s.wrap}>
      <h1 className={s.h1}>{data.author}</h1>
      <h2 className={s.h2}>Browser whisperer, symbols writer & CLI typer</h2>
      <p> I like bringing structure where it is lacking, systematizing information & automating processes. </p>
      <p> A Developer with an eye for Design, builds for performance & clarity. Mainly focusing on front-end architecture & modular design systems. </p>
      <p> Currently working at <a href='http://lightspeedhq.com'>LightspeedHQ</a> in Amsterdam, The Netherlands. </p>
      <Contact />
    </div>
    <PostList />
    <Footer />
  </div>

