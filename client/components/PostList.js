// @flow
import React from 'react'
import Link from 'react-router/Link'

import metadata from '../blog/posts/metadata.json'

export default () =>
  <div className="mb1">
    <h3>📝 Writing</h3>
    <ul>
      {
        Object.keys(metadata).map(post =>
          <li key={metadata[post].attributes.title}>
            <Link to={`/blog/${post}`}>{metadata[post].attributes.title}</Link>
          </li>
        )
      }
    </ul>
  </div>
