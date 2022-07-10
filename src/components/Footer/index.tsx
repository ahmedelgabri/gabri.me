import * as React from 'react'
import siteMeta from '../../config/siteMeta'

const {author} = siteMeta

export default function Footer() {
	return (
		<p className="py-12 text-sm text-gray-300 dark:text-gray-500">
			© {new Date().getFullYear()} {author}
		</p>
	)
}
