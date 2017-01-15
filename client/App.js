// @flow
import React from 'react'
import { BrowserRouter } from 'react-router'
import cxm from 'cxs/monolithic'
import Routes from './components/Routes'
import { colors } from './style'

cxm('*', {
  boxSizing: 'border-box'
})

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
  color: colors.teal
})

cxm('a', {
  color: 'inherit',
  textDecoration: 'none',
  borderBottom: '2px solid rgba(0, 0, 0, .1)',
  transition: 'all .2s ease-in-out',
  ':hover': {
    borderBottomColor: colors.orange
  },
  ':focus': {
    borderBottomColor: colors.orange
  }
})

cxm(':focus', {
  outline: `2px solid ${colors.teal}`
})

cxm('img', { maxWidth: '100%' })
cxm('ul', { padding: 0 })
cxm('ol', { padding: 0 })

const monospace = 'Fira Code, Input Mono, Input, Droid Sans Mono, monospace, monospace'
cxm('pre', {
  overflow: 'auto',
  maxWidth: '100%',
  padding: '1rem',
  borderRadius: '3px',
  backgroundColor: colors.darkBlue,
  color: colors.wheat,
  border: '1px solid',
  fontFamily: monospace
})

cxm('code', { fontFamily: monospace })

// The only reason this is stateful component is that HMR doesn't work on stateless ones
//  ¯\_(ツ)_/¯
export default () =>
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
