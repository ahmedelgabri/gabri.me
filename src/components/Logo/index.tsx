import * as React from 'react'
import {Link} from 'next-view-transitions'
import siteMeta from '../../config/siteMeta'

const {author} = siteMeta
const authorSlug = author.toLowerCase().replaceAll(' ', '-')

export default function Logo({slug}: {slug?: string}) {
	if (slug) {
		return (
			<div className="truncate">
				<Link
					href="/"
					className="text-neutral-400 no-underline transition-colors hover:text-neutral-800 dark:text-neutral-600 dark:hover:text-neutral-200"
				>
					<h1 className="inline">~/{authorSlug}</h1>
				</Link>
				<span className="hidden text-neutral-400 dark:text-neutral-600 md:inline">
					/blog/
				</span>
				<span className="hidden text-neutral-800 dark:text-neutral-200 md:inline">
					{slug}
				</span>
			</div>
		)
	}

	return (
		<Link
			href="/"
			className="text-neutral-800 no-underline dark:text-neutral-200"
		>
			<h1>
				<span className="text-neutral-500">~/</span>
				{authorSlug}
			</h1>
		</Link>
	)
}
