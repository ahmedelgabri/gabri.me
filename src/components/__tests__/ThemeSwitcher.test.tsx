import {describe, it, expect, beforeEach, vi} from 'vitest'
import {render, fireEvent} from '@testing-library/react'
import {ThemeSwitcher} from '../Header/ThemeSwitcher'

describe('ThemeSwitcher component', () => {
	beforeEach(() => {
		window.__themeSetting = 'dark'
		window.__theme = 'dark'
		window.__setTheme = vi.fn((setting: ThemeSetting) => {
			window.__themeSetting = setting
			window.__theme = setting === 'system' ? 'dark' : setting
		})
	})

	it('should render the current theme icon', () => {
		const {container} = render(<ThemeSwitcher />)

		const buttons = container.querySelectorAll('button')
		expect(buttons.length).toBeGreaterThan(0)
	})

	it('should show all desktop theme options on hover', () => {
		const {container} = render(<ThemeSwitcher />)

		const wrapper = container.querySelector('div')
		expect(wrapper).toBeDefined()

		fireEvent.mouseEnter(wrapper!)

		const desktopButtons = container.querySelectorAll('.md\\:flex button')
		expect(desktopButtons.length).toBe(3)
	})

	it('should call setTheme when clicking a theme option', () => {
		const {container} = render(<ThemeSwitcher />)

		const wrapper = container.querySelector('div')
		fireEvent.mouseEnter(wrapper!)

		const desktopButtons = container.querySelectorAll('.md\\:flex button')
		fireEvent.click(desktopButtons[1])

		expect(window.__setTheme).toHaveBeenCalled()
	})

	it('should have a mobile toggle button that cycles themes', () => {
		const {container} = render(<ThemeSwitcher />)

		const mobileButton = container.querySelector('.md\\:hidden')
		expect(mobileButton).not.toBeNull()

		fireEvent.click(mobileButton!)
		expect(window.__setTheme).toHaveBeenCalledWith('light')
	})
})
