import * as React from 'react'
import Link from 'next/link'
import YouTube from './YouTube'

type Props = Record<string, any> & {children: React.ReactNode}

const components = {
	YouTube,
	a(props: Props) {
		const href = props.href
		const isInternalLink =
			href && (href.startsWith('/') || href.startsWith('#'))

		if (isInternalLink) {
			return (
				<Link href={href}>
					<a {...props}>{props.children}</a>
				</Link>
			)
		}

		return <a target="_blank" rel="noopener noreferrer" {...props} />
	},
}

export default components
