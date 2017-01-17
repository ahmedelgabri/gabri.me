// @flow
import React from 'react'
import { Match, Miss, Redirect } from 'react-router'
import cxs from 'cxs'
import Home from '../Home'
import Post from './Post'
import Error from './Error'
import Head from './Head'
import Analytics from './Analytics'

const s = cxs({
  maxWidth: '50rem',
  marginRight: 'auto',
  marginLeft: 'auto',
  padding: '2rem'
})

const goHome = () => <Redirect to='/' />

export default () => (
  <main className={s}>
    <Head />
    <Analytics />
    <Match exactly pattern='/' component={Home} />
    <Match exactly pattern='/blog' render={goHome} />
    <Match exactly pattern='/blog/:post' component={Post} />
    <Match pattern='/work' render={goHome} />
    <Miss component={Error} />
  </main>
)
