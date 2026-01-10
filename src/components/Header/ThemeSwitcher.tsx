'use client'

import {useTheme} from '../../hooks'

const THEME_OPTIONS: ThemeSetting[] = ['dark', 'light', 'system']

function getNextTheme(current: ThemeSetting): ThemeSetting {
	const index = THEME_OPTIONS.indexOf(current)
	return THEME_OPTIONS[(index + 1) % THEME_OPTIONS.length]
}

export function ThemeSwitcher() {
	const {themeSetting, setTheme} = useTheme()

	return (
		<button
			className="cursor-pointer text-neutral-500 transition-colors hover:text-neutral-800 dark:hover:text-neutral-200"
			onClick={() => setTheme(getNextTheme(themeSetting))}
			aria-label={`Theme: ${themeSetting}. Click to switch.`}
		>
			[{themeSetting}]
		</button>
	)
}
