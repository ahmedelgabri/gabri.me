// @flow
import React from 'react'
import Link from 'next/prefetch'
import Logo from './Logo'
import cxs from 'cxs'

const s = {
  back: cxs({
    '@media screen and (min-width: 75em)': {
      position: 'fixed',
      top: '50%',
      left: '10%',
      opacity: .3,
      transition: 'all .2s linear',
      ':hover': {
        opacity: 1
      }
    }
  }),
  logo: cxs({
    width: 50,
    display: 'block',
    margin: '0 auto .5rem',
  }),
  link: cxs({
    display: 'block'
  })
}

export default () =>
  <p className={s.back}>
    <Link href='/' className={s.link}>
      <a>
        <Logo className={s.logo} />
        👈🏼 Go back
      </a>
    </Link>
  </p>
