import * as React from 'react'
import Link from 'next/link'
import siteMeta from '../../config/siteMeta'

const {author} = siteMeta

export default function Logo() {
	return (
		<Link href="/" className="block p-3">
			<h1 className="text-sm leading-none">{author}</h1>
		</Link>
	)
}
