import * as React from 'react'
import meta from '../../config/meta'

const {author} = meta

export default function Footer() {
	return (
		<p className="py-12 text-sm text-gray-300 dark:text-gray-500">
			© {new Date().getFullYear()} {author}
		</p>
	)
}
