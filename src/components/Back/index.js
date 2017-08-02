// @flow
import React from 'react'
import Link from 'gatsby-link'
import Logo from '../Logo'
import s from './back.module.css'

export default () =>
  <p>
    <Link to="/" className={s.link}>
      <Logo className={s.logo} />
    </Link>
  </p>
