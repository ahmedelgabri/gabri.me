import * as React from 'react'
import {Link} from 'gatsby'

export interface Props {
  posts: Array<{node: PostT}>
}

export default function PostList({posts = []}: Props) {
  return (
    <div className="prose">
      <h2 className="text-6xl font-extrabold leading-tight tracking-tight">
        Articles
      </h2>
      <ul>
        {posts.map(({node: {frontmatter: {title}, fields: {slug}}}) => (
          <li key={title}>
            <Link to={slug}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
