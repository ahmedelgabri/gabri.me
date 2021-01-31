import * as React from 'react'
import cn from 'classnames'

type Props = {
  level: '1' | '2' | '3' | '4' | '5' | '6'
  children: React.ReactNode
  className?: string
}

const styles = {
  1: 'text-6xl',
  2: 'text-6xl',
  3: 'text-4xl',
  4: 'text-3xl',
  5: 'text-2xl',
  6: 'text-xl',
}

export default function H({level = '1', children, className}: Props) {
  const Tag = `h${level}`

  return (
    // @ts-ignore
    <Tag
      className={cn(
        'mb-12 font-extrabold leading-none tracking-tight',
        className,
        styles[level],
      )}
    >
      {children}
    </Tag>
  )
}
