'use client'

import * as React from 'react'

export function useTheme() {
	const [themeSetting, setThemeSetting] = React.useState<ThemeSetting>('dark')
	const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>('dark')

	React.useEffect(() => {
		setThemeSetting(window.__themeSetting)
		setResolvedTheme(window.__theme)

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = () => {
			if (window.__themeSetting === 'system') {
				setResolvedTheme(window.__theme)
			}
		}
		mediaQuery.addEventListener('change', handleChange)
		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [])

	const setTheme = React.useCallback((setting: ThemeSetting) => {
		window.__setTheme(setting)
		setThemeSetting(setting)
		setResolvedTheme(window.__theme)
	}, [])

	return {
		themeSetting,
		resolvedTheme,
		setTheme,
	}
}
