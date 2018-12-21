import * as React from 'react'
import {Link} from 'gatsby'
import {logEvent} from '../../utils/analytics'

export interface Props {
  posts: Array<{node: PostT}>
}

export default ({posts = []}: Props) => (
  <div>
    <h2 css={{fontWeight: 500}}>Articles</h2>
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
