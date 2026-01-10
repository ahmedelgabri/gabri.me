import * as React from 'react'
import Link from 'next/link'
import YouTube from './src/components/YouTube'

type MDXComponents = {
	[key: string]: React.ComponentType<any>
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		YouTube,
		a: (props: React.ComponentPropsWithoutRef<'a'>) => {
			const href = props.href
			const isInternalLink =
				href && (href.startsWith('/') || href.startsWith('#'))

			if (isInternalLink) {
				return <Link href={href} {...props} />
			}

			return <a target="_blank" rel="noopener noreferrer" {...props} />
		},
		...components,
	}
}
