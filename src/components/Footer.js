// @flow
import React from 'react'
import cxs from 'cxs'
import data from '../data.json'

const s = {
  small: cxs({
    fontSize: '.5rem',
    opacity: '.3',
  }),
}

export default () =>
  <div>
    <small className={s.small}>
      {data.author} © {new Date().getFullYear()}
    </small>
  </div>
