// @flow
import React from 'react'
import cxs from 'cxs'
import Head from 'next/head'
import data from '../data.json'
import Wrap from '../components/layout/Wrap'
import Meta from '../components/Meta'
import Logo from '../components/Logo'
import PostList from '../components/PostList'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const s = {
  logo: cxs({
    width: 50,
    display: 'inline-block',
    opacity: 0.3,
    transition: 'all .2s linear',
    ':hover': {
      opacity: 1,
    },
  }),
}

export default () =>
  <Wrap>
    <Meta />
    <div>
      <Logo className={s.logo} />
      <h1 className={s.h1}>{data.author}</h1>
      <p>
        Front-end engineer,
        <br />
        Lead Front-end Developer at {' '}
        <a href="http://lightspeedhq.com">Lightspeed</a>
        <br />
        in Amsterdam, The Netherlands.
      </p>
      <Contact social={data.social} />
      <PostList />
    </div>
  </Wrap>
