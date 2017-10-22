// @flow
import React from 'react'
import { css } from 'emotion'

const Layout = ({ children }) => (
  <div
    className={css`
      padding: 3% 6%;
    `}
  >
    {children()}
  </div>
)

export default Layout
