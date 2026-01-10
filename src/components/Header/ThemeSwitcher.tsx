'use client'

import clsx from 'clsx'
import {useTheme, useHoverExpand, useCycleOption} from '../../hooks'

const THEME_OPTIONS: readonly ThemeSetting[] = [
	'dark',
	'light',
	'system',
] as const

const icons: Record<ThemeSetting, string> = {
	dark: 'i-tabler:moon',
	light: 'i-tabler:sun',
	system: 'i-tabler:device-desktop',
}

const delayClasses = ['delay-0', 'delay-[30ms]', 'delay-[60ms]']

export function ThemeSwitcher() {
	const {themeSetting, setTheme} = useTheme()
	const {isExpanded, hoverProps} = useHoverExpand()
	const {cycle, getVisibility} = useCycleOption(
		THEME_OPTIONS,
		themeSetting,
		setTheme,
	)

	return (
		<div className="flex items-center" {...hoverProps}>
			{/* Mobile: single toggle button */}
			<button
				className="flex h-4 w-5 cursor-pointer items-center justify-center text-neutral-700 hover:text-neutral-800 md:hidden dark:text-neutral-200 dark:hover:text-neutral-100"
				onClick={cycle}
				aria-label="Toggle theme"
			>
				<i className={clsx(icons[themeSetting], 'shrink-0')} />
			</button>

			{/* Desktop: expandable options */}
			<div className="hidden items-center md:flex">
				{THEME_OPTIONS.map((theme, index) => {
					const {isSelected, isVisible} = getVisibility(theme, isExpanded)

					return (
						<button
							key={theme}
							className={clsx(
								'flex h-4 cursor-pointer items-center justify-center transition-all duration-200 ease-out hover:text-neutral-800 dark:hover:text-neutral-200',
								isSelected
									? 'text-neutral-700 dark:text-neutral-200'
									: 'text-neutral-400',
								isVisible
									? 'w-5 scale-100 opacity-100'
									: 'w-0 scale-0 opacity-0',
								isExpanded ? delayClasses[index] : 'delay-0',
							)}
							onClick={() => setTheme(theme)}
							aria-label={`Switch to ${theme} theme`}
						>
							<i className={clsx(icons[theme], 'shrink-0')} />
						</button>
					)
				})}
			</div>
		</div>
	)
}
