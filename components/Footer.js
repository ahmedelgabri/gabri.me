// @flow
import React from 'react'
import cxs from 'cxs'
import Logo from './Logo'

const s = {
  small: cxs({
    fontSize: '.75rem'
  }),
  logo: cxs({
    width: '1.5rem',
    height: 'auto',
  })
}

export default () =>
  <div>
    <small className={s.small}>
      <Logo className={s.logo} /> © {new Date().getFullYear()}
    </small>
  </div>
