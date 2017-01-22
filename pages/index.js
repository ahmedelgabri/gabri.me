// @flow
import React from 'react'
import cxs from 'cxs'

import data from './data.json'
import { colors } from './style'
import PostList from './components/PostList'
import Contact from './components/Contact'
import Footer from './components/Footer'

const s = {
  wrap: cxs({
    borderBottom: '1px solid rgba(0, 0, 0, .2)',
    paddingBottom: '3rem',
    marginBottom: '3rem'
  }),
  h1: cxs({
    color: colors.teal,
    fontSize: '2rem',
    margin: 0,
    '@media screen and (min-width: 27em)': {
      fontSize: '3rem'
    }
  }),
  h2: cxs({
    color: colors.teal,
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'normal',
    lineHeight: 1.2,
    '@media screen and (min-width: 27em)': {
      fontSize: '1.5rem'
    }
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

