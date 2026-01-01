'use client'

import cn from 'clsx'
import {useTheme} from '../../hooks'

export function ThemeSwitcher() {
	const {toggleTheme, theme} = useTheme()

	return (
		<button className="cursor-pointer p-2" onClick={toggleTheme}>
			<i
				className={cn({
					'i-tabler:sun-low-filled hover:text-yellow-200': theme === 'dark',
					'i-tabler:moon-filled hover:text-sky-600': theme !== 'dark',
				})}
			/>
		</button>
	)
}
