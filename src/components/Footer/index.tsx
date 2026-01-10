import * as React from 'react'
import siteMeta from '../../config/siteMeta'

const {author} = siteMeta

export default function Footer() {
	return (
		<footer className="border-t border-neutral-300 pt-6 text-sm text-neutral-500 dark:border-neutral-700">
			© {new Date().getFullYear()} {author}
		</footer>
	)
}
