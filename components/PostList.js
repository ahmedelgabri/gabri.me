// @flow
import React from 'react'
import Link from 'next/prefetch'
import cxs from 'cxs'

import metadata from '../posts/articles/metadata.json'

const s = cxs({
  lineHeight: 1.5
})

export default () => (
  <div className="mb1">
    <h3>📝 Writing</h3>
    <ul className={s}>
      {
        Object.keys(metadata).map(post =>
          <li key={metadata[post].attributes.title}>
            <Link href={`/blog?post=${post}`} as={`/blog/${post}`}><a>{metadata[post].attributes.title}</a></Link>
          </li>
        )
      }
    </ul>
  </div>
)
