import * as React from 'react'
import cn from 'clsx'

type Props = {
	level: '1' | '2' | '3' | '4' | '5' | '6'
	children: React.ReactNode
	className?: string
}

const styles = {
	1: 'text-2xl',
	2: 'text-xl',
	3: 'text-lg',
	4: 'text-base',
	5: 'text-base',
	6: 'text-base',
}

export default function H({level = '1', children, className}: Props) {
	const Tag = `h${level}`

	return React.createElement(
		Tag,
		{
			className: cn(
				'mb-4 font-bold text-neutral-900 dark:text-neutral-100',
				className,
				styles[level],
			),
		},
		children,
	)
}
