// @flow
import React from 'react'
import {Link} from 'gatsby'
import {logEvent} from '../../utils/analytics'
import {css} from 'emotion'

export default ({posts = []}) => (
  <div>
    <h2 css={{fontWeight: 500}}>Sometimes I write</h2>
    <ul
      css={{
        lineHeight: 1.5,
        paddingLeft: '0.5rem',
        '@media screen and (min-width: 48em)': {
          paddingLeft: 0,
        },
      }}
    >
      {posts.map(({node: {frontmatter: {title}, fields: {slug}}}) => (
        <li key={title}>
          <Link to={slug} onClick={() => logEvent('Post', title)}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)
