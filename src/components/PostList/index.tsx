import * as React from 'react'
import Link from 'next/link'
import H from '../Prose/H'

export default function PostList(props: {posts: any[]}) {
  const {posts} = props

  return (
    <>
      <H level="2">Articles</H>
      <ul>
        {posts.map(({slug, date, title}) => (
          <li key={title} className="items-center mb-4 lg:mb-2 lg:flex">
            <div className="lg:mr-4 lg:text-right lg:w-1/6">
              <time className="text-sm text-gray-500" dateTime={date}>
                {date}
              </time>
            </div>
            <Link href={slug}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
