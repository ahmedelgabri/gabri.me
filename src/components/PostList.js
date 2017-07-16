// @flow
import React from 'react'
import Link from 'gatsby-link'
import cxs from 'cxs'

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

export default ({ posts = [] }) =>
  <div className={s.section}>
    <h2>Writing</h2>
    <ul className={s.list}>
      {posts.map(({ node: { frontmatter: { title }, fields: { slug } } }) =>
        <li key={title}>
          <Link to={slug}>
            {title}
          </Link>
        </li>
      )}
    </ul>
  </div>
