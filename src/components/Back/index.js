// @flow
import React from 'react'
import {Link} from 'gatsby'
import Logo from '../Logo'
import {css} from 'emotion'

export default () => (
  <p>
    <Link to="/" css={{border: 'none'}}>
      <Logo />
    </Link>
  </p>
)
