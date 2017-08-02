// @flow
import React from 'react'
import s from './footer.module.css'

export default ({ author }) =>
  <div>
    <small className={s.small}>
      {author} © {new Date().getFullYear()}
    </small>
  </div>
