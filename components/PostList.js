// @flow
import React from 'react'
import Link from 'next/link'
import cxs from 'cxs'

import metadata from '../posts/articles/metadata.json'

const s = {
  section: cxs({
    '@media screen and (min-width: 65em)': {
      opacity: 0.3,
      transition: 'opacity .2s linear',
      ':hover': {
        opacity: 1,
      },
    },
  }),
  list: cxs({
    lineHeight: 1.5,
    paddingLeft: '.5rem',
    '@media screen and (min-width: 48em)': {
      paddingLeft: 0,
    },
  }),
}

export default () =>
  <div className={s.section}>
    <h2>Writing</h2>
    <ul className={s.list}>
      {Object.keys(metadata).map(post =>
        <li key={metadata[post].attributes.title}>
          <Link prefetch href={`/blog?post=${post}`} as={`/blog/${post}`}>
            <a>{metadata[post].attributes.title}</a>
          </Link>
        </li>
      )}
    </ul>
  </div>
