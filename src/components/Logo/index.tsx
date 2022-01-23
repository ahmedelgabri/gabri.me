import * as React from 'react'
import Link from 'next/link'
import {author} from '../../config/meta'

export default function Logo() {
  return (
    <Link href="/">
      <a className="block p-3">
        <h1 className="leading-none text-sm">{author}</h1>
      </a>
    </Link>
  )
}
