import * as React from 'react'
import {Link} from 'next-view-transitions'
import YouTube from './src/components/YouTube'
import Tweet from './src/components/Tweet'

type MDXComponents = {
	[key: string]: React.ComponentType<any>
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		YouTube,
		Tweet,
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
