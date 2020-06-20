import * as React from 'react'
import Link from 'next/link'

export default function PostList(props: {posts: any[]}) {
  const {posts} = props

  return (
    <div className="prose">
      <h2 className="text-6xl font-extrabold leading-tight tracking-tight">
        Articles
      </h2>
      <ul>
        {posts
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map(({slug, date, title}) => (
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
    </div>
  )
}
