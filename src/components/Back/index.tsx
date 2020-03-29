import * as React from 'react'
import {Link} from 'gatsby'
import {useMatch} from '@reach/router'

export default function Back() {
  const isArticle = useMatch('/blog/:post')

  return (
    isArticle && (
      <div className="mr-4">
        <Link
          className="p-1 text-gray-500 text-tiny hover:bg-gray-300 hover:text-black"
          to="/blog"
        >
          ← Back to articles
        </Link>
      </div>
    )
  )
}
