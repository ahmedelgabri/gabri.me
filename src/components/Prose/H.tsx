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
        'mb-8 font-serif font-extrabold !leading-tight tracking-tight lg:mb-12',
        className,
        styles[level],
      )}
    >
      <span className="inline-block bg-gradient-to-br from-slate-500 to-slate-900 bg-clip-text text-transparent dark:bg-gradient-to-b dark:from-slate-500 dark:to-slate-700">
        {children}
      </span>{' '}
      {extra && extra}
    </Tag>
  )
}
