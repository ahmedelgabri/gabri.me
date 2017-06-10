// @flow
import React from 'react'
import cxs from 'cxs'

const s = cxs({
  maxWidth: '60rem',
  padding: '6%',
})

export default ({ children }) => <div className={s}>{children}</div>
