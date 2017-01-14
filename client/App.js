// @flow
import React, { Component } from 'react'
import { BrowserRouter, Match, Miss, Redirect } from 'react-router'
import cxs from 'cxs'
import cxm from 'cxs/monolithic'

import Home from './Home'
import Post from './components/Post'
import Error from './components/Error'
import Head from './components/Head'

import colors from './colors'

cxm('html', {
  height: '100%',
  fontSize: '100%'
})

cxm('body', {
  height: '100%',
  fontSize: '1rem',
  lineHeight: 1.4,
  textSizeAdjust: '100%',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  margin: 0,
  backgroundColor: colors.wheat,
  color: colors.teal,
  /* display: flex, */
  justifyContent: 'center',
  alignItems: 'center'
})

cxm('a', {
  color: colors.orange,
  textDecoration: 'none',
  transition: 'all .2s ease-in-out',
  ':hover': {
    textDecoration: 'underline'
  },
  ':focus': {
    textDecoration: 'underline'
  }
})

cxm(':focus', {
  outline: `2px solid ${colors.teal}`
})

cxm('img', { maxWidth: '100%' })
cxm('ul', { padding: 0 })
cxm('ol', { padding: 0 })

const s = cxs({
  maxWidth: '40rem',
  marginRight: 'auto',
  marginLeft: 'auto',
  padding: '1rem'
})

const goHome = () => <Redirect to='/' />

// The only reason this is stateful component is that HMR doesn't work on stateless ones
//  ¯\_(ツ)_/¯
export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <main className={s}>
          <Head />
          <Match exactly pattern='/' component={Home} />
          <Match exactly pattern='/blog' render={goHome} />
          <Match exactly pattern='/blog/:post' component={Post} />
          <Match pattern='/work' render={goHome} />
          <Miss component={Error} />
        </main>
      </BrowserRouter>
    )
  }
}
