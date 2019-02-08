// @flow
import * as React from 'react'

export type Props = PropsT<{
  author: string,
}>

export default function Footer({author}: Props) {
  return (
    <div>
      <small css={{fontSize: '0.5rem', opacity: 0.3}}>
        {author} © {new Date().getFullYear()}
      </small>
    </div>
  )
}
