import NextLink from 'next/link'
import type {ComponentProps} from 'react'

export function Link(props: ComponentProps<typeof NextLink>) {
	return <NextLink {...props} />
}

export function ViewTransitions({children}: {children: React.ReactNode}) {
	return <>{children}</>
}
