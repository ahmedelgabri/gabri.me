import * as React from 'react'
import Logo from '../Logo'
import {ThemeSwitcher} from './ThemeSwitcher'

export default function Header({slug}: {slug?: string}) {
	return (
		<header className="mb-8 flex items-center justify-between gap-4">
			<div className="min-w-0 flex-1">
				<Logo slug={slug} />
			</div>
			<ThemeSwitcher />
		</header>
	)
}
