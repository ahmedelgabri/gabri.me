import * as React from 'react'

export interface Props {
  author: string
}

export default function Footer({author}: Props) {
  return (
    <p className="text-gray-300 text-tiny">
      {author} © {new Date().getFullYear()}
    </p>
  )
}
