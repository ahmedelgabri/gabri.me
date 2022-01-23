import * as React from 'react'
import H from '../Prose/H'

export default function List(props: {title: string; posts: any[]}) {
  const {title, posts} = props

  return (
    <>
      <H level="3">{title}</H>
      <ul>
        {posts.map(({date, item}, i) => (
          <li key={`${date}-${i}`} className="items-start mb-4 lg:mb-2 lg:flex">
            <div className="lg:mr-4 lg:text-left">
              <time
                className="font-mono text-sm tabular-nums text-gray-600"
                dateTime={date}
              >
                {date}
              </time>
            </div>
            {item && <div>{item}</div>}
          </li>
        ))}
      </ul>
    </>
  )
}
