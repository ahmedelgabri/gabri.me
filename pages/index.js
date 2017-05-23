// @flow
import React from 'react'
import cxs from 'cxs'
import Head from 'next/head'
import data from '../data.json'
import { isNight, colors } from '../lib/style'
import Meta from '../components/Meta'
import PostList from '../components/PostList'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const s = {
  wrap: cxs({
    borderBottom: `1px solid ${isNight() ? 'rgba(255, 255, 255, .2)' : 'rgba(0, 0, 0, .2)'}`,
    paddingBottom: '3rem',
    marginBottom: '3rem',
  }),
  h1: cxs({
    color: colors().teal(),
    fontSize: '2rem',
    margin: 0,
    '@media screen and (min-width: 27em)': {
      fontSize: '3rem',
    },
  }),
  h2: cxs({
    color: colors().teal(),
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'normal',
    lineHeight: 1.2,
    '@media screen and (min-width: 27em)': {
      fontSize: '1.5rem',
    },
  }),
}

export default () => (
  <div>
    <Meta />
    <div className={s.wrap}>
      <h1 className={s.h1}>{data.author}</h1>
      <p>
        I'm a Front-end engineer, currently working as Lead Front-end Developer at
        {' '}
        <a href="http://lightspeedhq.com">LightspeedHQ</a>
        {' '}
        in Amsterdam, The Netherlands.
        {' '}
      </p>
      <Contact />
    </div>
    <PostList />
    <Footer />
  </div>
)
