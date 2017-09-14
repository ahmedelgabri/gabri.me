// @flow
import React from 'react'
import { css } from 'emotion'

export default ({ author }) =>
  <div>
    <small
      css={`
      font-size: .5rem;
      opacity: .3;
    `}
    >
      {author} © {new Date().getFullYear()}
    </small>
  </div>
