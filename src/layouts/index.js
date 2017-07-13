// @flow
import React from 'react'
import cxs from 'cxs'
import 'prism-themes/themes/prism-duotone-dark.css'

const s = cxs({
  maxWidth: '60rem',
  padding: '6%',
})

const Layout = ({ children }) =>
  <div className={s}>
    {children()}
  </div>

export default Layout
