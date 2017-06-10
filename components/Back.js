// @flow
import React from 'react'
import Link from 'next/link'
import Logo from './Logo'
import cxs from 'cxs'

const s = {
  logo: cxs({
    width: 50,
    display: 'inline-block',
    opacity: 0.3,
    transition: 'opacity .2s linear',
    ':hover': {
      opacity: 1,
    },
  }),
  link: cxs({
    border: 'none',
  }),
}

export default () =>
  <p>
    <Link href="/" prefetch>
      <a className={s.link}>
        <Logo className={s.logo} />
      </a>
    </Link>
  </p>
