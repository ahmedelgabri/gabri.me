// @flow
import React from 'react'
import Link from 'gatsby-link'
import { logEvent } from '../../utils/analytics'
import s from './postlist.module.css'

export default ({ posts = [] }) =>
  <div className={s.section}>
    <h2>Writing</h2>
    <ul className={s.list}>
      {posts.map(({ node: { frontmatter: { title }, fields: { slug } } }) =>
        <li key={title}>
          <Link to={slug} onClick={() => logEvent('Post', title)}>
            {title}
          </Link>
        </li>
      )}
    </ul>
  </div>
