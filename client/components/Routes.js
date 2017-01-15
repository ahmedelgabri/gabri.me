// @flow
import React from 'react'
import { Match, Miss, Redirect } from 'react-router'
import cxs from 'cxs'
import Home from '../Home'
import Post from './Post'
import Error from './Error'
import Head from './Head'
import WithAnalytics from './hoc/WithAnalytics'


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
    <Match exactly pattern='/' component={WithAnalytics(Home)} />
    <Match exactly pattern='/blog' render={goHome} />
    <Match exactly pattern='/blog/:post' component={WithAnalytics(Post)} />
    <Match pattern='/work' render={goHome} />
    <Miss component={WithAnalytics(Error)} />
  </main>
)
