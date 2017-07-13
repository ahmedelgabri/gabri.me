// @flow
import React from 'react'
import cxs from 'cxs'

const s = {
  small: cxs({
    fontSize: '.5rem',
    opacity: '.3',
  }),
}

export default ({ author }) =>
  <div>
    <small className={s.small}>
      {author} © {new Date().getFullYear()}
    </small>
  </div>
