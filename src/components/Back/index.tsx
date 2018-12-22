import * as React from 'react'
import {Link} from 'gatsby'
import Logo from '../Logo'

export default function Back() {
  return (
    <p>
      <Link to="/" css={{border: 'none'}}>
        <Logo />
      </Link>
    </p>
  )
}
