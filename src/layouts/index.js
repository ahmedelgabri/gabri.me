// @flow
import React from 'react'
import s from './layout.module.css'

const Layout = ({ children }) =>
  <div className={s.wrap}>
    {children()}
  </div>

export default Layout
