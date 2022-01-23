import * as React from 'react'
import cn from 'classnames'

type Props = {
  level: '1' | '2' | '3' | '4' | '5' | '6'
  children: React.ReactNode
  className?: string
  extra?: any
}

const styles = {
  1: 'text-4xl lg:text-6xl',
  2: 'text-4xl lg:text-6xl',
  3: 'text-3xl lg:text-4xl',
  4: 'text-2xl lg:text-3xl',
  5: 'text-xl lg:text-2xl',
  6: 'text-lg lg:text-xl',
}

export default function H({level = '1', children, extra, className}: Props) {
  const Tag = `h${level}`

  return (
    // @ts-ignore
    <Tag
      className={cn(
        'mb-8 lg:mb-12 font-extrabold font-serif !leading-snug tracking-tight',
        className,
        styles[level],
      )}
    >
      <span className="inline-block bg-gradient-to-br from-slate-500 to-slate-900 dark:bg-gradient-to-b dark:from-slate-500 dark:to-slate-700 bg-clip-text text-transparent">
        {children}
      </span>{' '}
      {extra && extra}
    </Tag>
  )
}
