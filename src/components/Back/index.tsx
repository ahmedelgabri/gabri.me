import * as React from 'react'
import {Link} from 'gatsby'
import {useMatch} from '@reach/router'
import Logo from '../Logo'

export default function Back() {
  const match = useMatch('/blog/:post')
  const to = match ? '/blog' : '/'

  return (
    <p>
      <Link to={to}>
        <Logo />
      </Link>
    </p>
  )
}
