import * as React from 'react'
import Link from 'next/link'
import YouTube from './YouTube'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = Record<string, any> & {children: React.ReactNode}

const components = {
	YouTube,
	a(props: Props) {
		const href = props.href
		const isInternalLink =
			href && (href.startsWith('/') || href.startsWith('#'))

		if (isInternalLink) {
			return (
				<Link href={href} {...props}>
					{props.children}
				</Link>
			)
		}

		// eslint-disable-next-line jsx-a11y/anchor-has-content
		return <a target="_blank" rel="noopener noreferrer" {...props} />
	},
}

export default components
