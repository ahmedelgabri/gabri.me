import * as React from 'react'
import {Link} from 'gatsby'
import {author} from '../../config/meta'

export default function Logo() {
  return (
    <Link className="block" to="/">
      <h1 className="p-1 leading-none text-tiny">{author}</h1>
    </Link>
  )
}
