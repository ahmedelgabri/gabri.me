import * as React from 'react'

export function useTheme() {
	const [theme, setTheme] = React.useState<Theme>('light')

	React.useEffect(() => {
		setTheme(window.__theme)
		window.__onThemeChange = () => {
			setTheme(window.__theme)
		}
	}, [])

	return {
		toggleTheme: () => {
			const newTheme = theme === 'dark' ? 'light' : 'dark'
			window.__setPreferredTheme(newTheme)
			setTheme(newTheme)
		},
		theme,
	}
}
