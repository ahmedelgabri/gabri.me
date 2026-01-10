'use client'

import clsx from 'clsx'
import {useColorTheme, useHoverExpand, useCycleOption} from '../../hooks'

const COLOR_OPTIONS: readonly ColorTheme[] = [
	'blue',
	'amber',
	'teal',
	'purple',
] as const

const colorClasses: Record<ColorTheme, string> = {
	blue: 'bg-blue-500',
	amber: 'bg-amber-500',
	teal: 'bg-teal-500',
	purple: 'bg-purple-500',
}

const delayClasses = ['delay-0', 'delay-[30ms]', 'delay-[60ms]', 'delay-[90ms]']

export function ColorSwitcher() {
	const {colorTheme, setColorTheme} = useColorTheme()
	const {isExpanded, hoverProps} = useHoverExpand()
	const {cycle, getVisibility} = useCycleOption(
		COLOR_OPTIONS,
		colorTheme,
		setColorTheme,
	)

	return (
		<div className="flex items-center" {...hoverProps}>
			{/* Mobile: single toggle button */}
			<button
				className="flex h-4 w-5 cursor-pointer items-center justify-center md:hidden"
				onClick={cycle}
				aria-label="Toggle color"
			>
				<span
					className={clsx(
						colorClasses[colorTheme],
						'h-3 w-3 shrink-0 rounded-full',
					)}
				/>
			</button>

			{/* Desktop: expandable options */}
			<div className="hidden items-center md:flex">
				{COLOR_OPTIONS.map((color, index) => {
					const {isSelected, isVisible} = getVisibility(color, isExpanded)

					return (
						<button
							key={color}
							className={clsx(
								'flex h-4 cursor-pointer items-center justify-center transition-all duration-200 ease-out hover:opacity-100',
								isSelected ? 'opacity-100' : 'opacity-50',
								isVisible ? 'w-5 scale-100' : 'w-0 scale-0 opacity-0',
								isExpanded ? delayClasses[index] : 'delay-0',
							)}
							onClick={() => setColorTheme(color)}
							aria-label={`Switch to ${color} color`}
						>
							<span
								className={clsx(
									colorClasses[color],
									'h-3 w-3 shrink-0 rounded-full',
								)}
							/>
						</button>
					)
				})}
			</div>
		</div>
	)
}
