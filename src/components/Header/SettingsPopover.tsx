import * as React from 'react'
import clsx from 'clsx'
import {useTheme, useColorTheme, useFontTheme} from '../../hooks'

const THEME_OPTIONS: readonly ThemeSetting[] = ['dark', 'light', 'system']
const COLOR_OPTIONS: readonly ColorTheme[] = ['blue', 'amber', 'teal', 'purple']
const FONT_OPTIONS: readonly FontTheme[] = ['mono', 'serif', 'sans']

const themeIcons: Record<ThemeSetting, string> = {
	dark: 'i-tabler:moon',
	light: 'i-tabler:sun',
	system: 'i-tabler:device-desktop',
}

const colorClasses: Record<ColorTheme, string> = {
	blue: 'bg-blue-500',
	amber: 'bg-amber-500',
	teal: 'bg-teal-500',
	purple: 'bg-purple-500',
}

const fontClasses: Record<FontTheme, string> = {
	mono: 'font-mono',
	serif: 'font-serif',
	sans: 'font-sans',
}

const accentTextClasses: Record<ColorTheme, string> = {
	blue: 'text-blue-500',
	amber: 'text-amber-500',
	teal: 'text-teal-500',
	purple: 'text-purple-500',
}

export function SettingsPopover() {
	const [isOpen, setIsOpen] = React.useState(false)
	const popoverRef = React.useRef<HTMLDivElement>(null)

	const {themeSetting, setTheme} = useTheme()
	const {colorTheme, setColorTheme} = useColorTheme()
	const {fontTheme, setFontTheme} = useFontTheme()

	React.useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				popoverRef.current &&
				!popoverRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		function handleEscape(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
			document.addEventListener('keydown', handleEscape)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [isOpen])

	return (
		<div ref={popoverRef} className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={clsx(
					'flex h-8 w-8 cursor-pointer items-center justify-center rounded transition-colors',
					'hover:bg-neutral-200 focus:bg-neutral-200',
					'dark:hover:bg-neutral-800 dark:focus:bg-neutral-800',
					isOpen && 'bg-neutral-200 dark:bg-neutral-800',
				)}
				aria-label="Open settings"
				aria-expanded={isOpen}
			>
				<span
					className={clsx(
						fontClasses[fontTheme],
						accentTextClasses[colorTheme],
						'text-lg font-bold',
					)}
				>
					A
				</span>
			</button>

			{isOpen && (
				<div
					className={clsx(
						'absolute right-0 top-full z-50 mt-2 min-w-36 rounded-lg border p-3 shadow-lg',
						'border-neutral-300 bg-neutral-100',
						'dark:border-neutral-700 dark:bg-neutral-800',
					)}
				>
					<div className="space-y-3">
						{/* Theme */}
						<div>
							<div className="mb-1.5 text-xs text-neutral-500">Theme</div>
							<div className="flex gap-1">
								{THEME_OPTIONS.map((theme) => (
									<button
										key={theme}
										onClick={() => setTheme(theme)}
										className={clsx(
											'flex h-7 w-7 cursor-pointer items-center justify-center rounded transition-colors',
											themeSetting === theme
												? 'bg-neutral-300 dark:bg-neutral-600'
												: 'hover:bg-neutral-200 dark:hover:bg-neutral-700',
										)}
										aria-label={`Switch to ${theme} theme`}
									>
										<i className={themeIcons[theme]} />
									</button>
								))}
							</div>
						</div>

						{/* Color */}
						<div>
							<div className="mb-1.5 text-xs text-neutral-500">Color</div>
							<div className="flex gap-1">
								{COLOR_OPTIONS.map((color) => (
									<button
										key={color}
										onClick={() => setColorTheme(color)}
										className={clsx(
											'flex h-7 w-7 cursor-pointer items-center justify-center rounded transition-colors',
											colorTheme === color
												? 'bg-neutral-300 dark:bg-neutral-600'
												: 'hover:bg-neutral-200 dark:hover:bg-neutral-700',
										)}
										aria-label={`Switch to ${color} color`}
									>
										<span
											className={clsx(
												colorClasses[color],
												'h-4 w-4 rounded-full',
											)}
										/>
									</button>
								))}
							</div>
						</div>

						{/* Font */}
						<div>
							<div className="mb-1.5 text-xs text-neutral-500">Font</div>
							<div className="flex gap-1">
								{FONT_OPTIONS.map((font) => (
									<button
										key={font}
										onClick={() => setFontTheme(font)}
										className={clsx(
											'flex h-7 w-7 cursor-pointer items-center justify-center rounded transition-colors',
											fontTheme === font
												? 'bg-neutral-300 dark:bg-neutral-600'
												: 'hover:bg-neutral-200 dark:hover:bg-neutral-700',
										)}
										aria-label={`Switch to ${font} font`}
									>
										<span className={clsx(fontClasses[font], 'text-sm')}>
											A
										</span>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
