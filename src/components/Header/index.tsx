'use client'

import * as React from 'react'
import Logo from '../Logo'
import {ThemeSwitcher} from './ThemeSwitcher'
import {ColorSwitcher} from './ColorSwitcher'

export default function Header({slug}: {slug?: string}) {
	const [activeHover, setActiveHover] = React.useState<
		'color' | 'theme' | null
	>(null)

	return (
		<header className="mb-8 flex items-center justify-between gap-4">
			<div className="min-w-0 flex-1">
				<Logo slug={slug} />
			</div>
			<div className="flex items-center gap-2">
				<ColorSwitcher
					onHover={(isHovered) => setActiveHover(isHovered ? 'color' : null)}
					disabled={activeHover === 'theme'}
				/>
				<ThemeSwitcher
					onHover={(isHovered) => setActiveHover(isHovered ? 'theme' : null)}
					disabled={activeHover === 'color'}
				/>
			</div>
		</header>
	)
}
