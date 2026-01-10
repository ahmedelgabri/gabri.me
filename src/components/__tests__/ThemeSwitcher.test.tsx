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

	it('should show all theme options on hover', () => {
		const {container} = render(<ThemeSwitcher />)

		const wrapper = container.querySelector('div')
		expect(wrapper).toBeDefined()

		fireEvent.mouseEnter(wrapper!)

		const buttons = container.querySelectorAll('button')
		expect(buttons.length).toBe(3)
	})

	it('should call setTheme when clicking a theme option', () => {
		const {container} = render(<ThemeSwitcher />)

		const wrapper = container.querySelector('div')
		fireEvent.mouseEnter(wrapper!)

		const buttons = container.querySelectorAll('button')
		fireEvent.click(buttons[1])

		expect(window.__setTheme).toHaveBeenCalled()
	})

	it('should call onHover callback when hovering', () => {
		const onHover = vi.fn()
		const {container} = render(<ThemeSwitcher onHover={onHover} />)

		const wrapper = container.querySelector('div')
		fireEvent.mouseEnter(wrapper!)

		expect(onHover).toHaveBeenCalledWith(true)
	})

	it('should not expand when disabled', () => {
		const onHover = vi.fn()
		const {container} = render(<ThemeSwitcher onHover={onHover} disabled />)

		const wrapper = container.querySelector('div')
		fireEvent.mouseEnter(wrapper!)

		expect(onHover).not.toHaveBeenCalled()
	})
})
