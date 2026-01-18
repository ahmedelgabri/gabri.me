'use client'

import clsx from 'clsx'
import {useFontTheme, useHoverExpand, useCycleOption} from '../../hooks'

const FONT_OPTIONS: readonly FontTheme[] = ['mono', 'serif', 'sans'] as const

const fontClasses: Record<FontTheme, string> = {
	mono: 'font-mono',
	serif: 'font-serif',
	sans: 'font-sans',
}

const delayClasses = ['delay-0', 'delay-[30ms]', 'delay-[60ms]']

export function FontSwitcher() {
	const {fontTheme, setFontTheme} = useFontTheme()
	const {isExpanded, hoverProps} = useHoverExpand()
	const {cycle, getVisibility} = useCycleOption(
		FONT_OPTIONS,
		fontTheme,
		setFontTheme,
	)

	return (
		<div className="flex items-center" {...hoverProps}>
			{/* Mobile: single toggle button */}
			<button
				className="flex h-4 w-5 cursor-pointer items-center justify-center text-neutral-700 hover:text-neutral-800 md:hidden dark:text-neutral-200 dark:hover:text-neutral-100"
				onClick={cycle}
				aria-label="Toggle font"
			>
				<span className={clsx(fontClasses[fontTheme], 'shrink-0 text-sm')}>
					A
				</span>
			</button>

			{/* Desktop: expandable options */}
			<div className="hidden items-center md:flex">
				{FONT_OPTIONS.map((font, index) => {
					const {isSelected, isVisible} = getVisibility(font, isExpanded)

					return (
						<button
							key={font}
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
							onClick={() => setFontTheme(font)}
							aria-label={`Switch to ${font} font`}
						>
							<span className={clsx(fontClasses[font], 'shrink-0 text-sm')}>
								A
							</span>
						</button>
					)
				})}
			</div>
		</div>
	)
}
