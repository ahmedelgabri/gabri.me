// @flow
import React from 'react'
import Link from 'gatsby-link'
import { logEvent } from '../../utils/analytics'
import { css } from 'emotion'

export default ({ posts = [] }) =>
  <div>
    <h2>Posts</h2>
    <ul
      css={`
        line-height: 1.5;
        padding-left: .5rem;
        @media screen and (min-width: 48em) {
          padding-left: 0;
        }
    `}
    >
      {posts.map(({ node: { frontmatter: { title }, fields: { slug } } }) =>
        <li key={title}>
          <Link to={slug} onClick={() => logEvent('Post', title)}>
            {title}
          </Link>
        </li>
      )}
    </ul>
  </div>
