'use client'

import * as React from 'react'
import {IoMdSunny, IoMdMoon} from 'react-icons/io'
import {useTheme} from '../../hooks'

export function ThemeSwitcher() {
	const {toggleTheme, theme} = useTheme()

	return (
		<button className="p-2" onClick={toggleTheme}>
			{theme === 'dark' ? <IoMdSunny /> : <IoMdMoon />}
		</button>
	)
}
