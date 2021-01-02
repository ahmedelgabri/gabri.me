import * as React from 'react'

type Props = {
  level: '1' | '2' | '3' | '4' | '5' | '6'
  children: React.ReactNode
}

export default function H({level, children}: Props) {
  const Tag = `h${level || 1}`

  return (
    // @ts-ignore
    <Tag className="mb-12 text-6xl font-extrabold leading-none tracking-tight">
      {children}
    </Tag>
  )
}
