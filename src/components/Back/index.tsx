import * as React from 'react'
import {Link} from 'gatsby'
import {useMatch} from '@reach/router'

export default function Back() {
  const isArticle = useMatch('/blog/:post')

  return (
    isArticle && (
      <Link className="leading-none text-gray-500 text-tiny" to="/blog">
        ← Back to articles
      </Link>
    )
  )
}
