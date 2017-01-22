// @flow
import React from 'react'
import Link from 'react-router/Link'
import cxs from 'cxs'

import metadata from '../blog/posts/metadata.json'

const s = cxs({
  lineHeight: 1.5
})

export default () =>
  <div className="mb1">
    <h3>📝 Writing</h3>
    <ul className={s}>
      {
        Object.keys(metadata).map(post =>
          <li key={metadata[post].attributes.title}>
            <Link to={`/blog/${post}`}>{metadata[post].attributes.title}</Link>
          </li>
        )
      }
    </ul>
  </div>
