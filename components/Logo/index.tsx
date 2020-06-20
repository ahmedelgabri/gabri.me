import * as React from 'react'
import Link from 'next/link'
import {author} from '../../config/meta'

export default function Logo() {
  return (
    <Link href="/">
      <a className="block">
        <h1 className="p-1 leading-none text-sm">{author}</h1>
      </a>
    </Link>
  )
}
