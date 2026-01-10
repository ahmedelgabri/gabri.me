'use client'

import * as React from 'react'
import {useColorTheme} from '../../hooks'

const COLOR_OPTIONS: ColorTheme[] = ['blue', 'amber', 'teal', 'purple']

const colorClasses: Record<ColorTheme, string> = {
	blue: 'bg-blue-500',
	amber: 'bg-amber-500',
	teal: 'bg-teal-500',
	purple: 'bg-purple-500',
}

interface Props {
	onHover?: (isHovered: boolean) => void
	disabled?: boolean
}

export function ColorSwitcher({onHover, disabled}: Props) {
	const {colorTheme, setColorTheme} = useColorTheme()
	const [isExpanded, setIsExpanded] = React.useState(false)
	const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

	const handleMouseEnter = () => {
		if (disabled) return
		if (timeoutRef.current) clearTimeout(timeoutRef.current)
		setIsExpanded(true)
		onHover?.(true)
	}

	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => {
			setIsExpanded(false)
			onHover?.(false)
		}, 300)
	}

	React.useEffect(() => {
		if (disabled && isExpanded) {
			setIsExpanded(false)
		}
	}, [disabled, isExpanded])

	React.useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		}
	}, [])

	return (
		<div
			className="flex items-center"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="flex items-center">
				{COLOR_OPTIONS.map((color, index) => {
					const isSelected = color === colorTheme
					const showWhenCollapsed = isSelected && !isExpanded
					const showWhenExpanded = isExpanded
					const isVisible = showWhenCollapsed || showWhenExpanded

					return (
						<button
							key={color}
							className={`flex h-4 cursor-pointer items-center justify-center transition-all duration-200 ease-out hover:opacity-100 ${
								isSelected ? 'opacity-100' : 'opacity-50'
							} ${isVisible ? 'w-5 scale-100' : 'w-0 scale-0 opacity-0'}`}
							onClick={() => setColorTheme(color)}
							aria-label={`Switch to ${color} color`}
							style={{
								transitionDelay: isExpanded ? `${index * 30}ms` : '0ms',
							}}
						>
							<span
								className={`${colorClasses[color]} h-3 w-3 shrink-0 rounded-full`}
							/>
						</button>
					)
				})}
			</div>
		</div>
	)
}
