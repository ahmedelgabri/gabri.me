// @flow
import React from 'react'
import Link from 'gatsby-link'
import Logo from '../Logo'
import { css } from 'emotion'

export default () => (
  <p>
    <Link
      to="/"
      className={css`
        border: none;
      `}
    >
      <Logo
        className={css`
          width: 50px;
          display: inline-block;
          opacity: 0.3;
          transition: opacity 0.2s linear;
          &:hover {
            opacity: 1;
          }
        `}
      />
    </Link>
  </p>
)
