// @flow
import React from 'react'
import cxs from 'cxs'
import Logo from './Logo'

const s = cxs({
  fontSize: '.75rem'
})

export default () =>
  <div>
    <small className={s}>
      <Logo style={{ width: '1.5rem', height: 'auto', opacity: .3 }} /> ©{new Date().getFullYear()}
    </small>
  </div>
