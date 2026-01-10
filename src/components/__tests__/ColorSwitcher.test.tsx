import {describe, it, expect, beforeEach, vi} from 'vitest'
import {render, fireEvent} from '@testing-library/react'
import {ColorSwitcher} from '../Header/ColorSwitcher'

describe('ColorSwitcher component', () => {
	beforeEach(() => {
		window.__colorTheme = 'blue'
		window.__setColorTheme = vi.fn((color: ColorTheme) => {
			window.__colorTheme = color
		})
	})

	it('should render the current color indicator', () => {
		const {container} = render(<ColorSwitcher />)

		const buttons = container.querySelectorAll('button')
		expect(buttons.length).toBeGreaterThan(0)
	})

	it('should show all desktop color options on hover', () => {
		const {container} = render(<ColorSwitcher />)

		const wrapper = container.querySelector('div')
		expect(wrapper).toBeDefined()

		fireEvent.mouseEnter(wrapper!)

		const desktopButtons = container.querySelectorAll('.md\\:flex button')
		expect(desktopButtons.length).toBe(4)
	})

	it('should call setColorTheme when clicking a color option', () => {
		const {container} = render(<ColorSwitcher />)

		const wrapper = container.querySelector('div')
		fireEvent.mouseEnter(wrapper!)

		const desktopButtons = container.querySelectorAll('.md\\:flex button')
		fireEvent.click(desktopButtons[1])

		expect(window.__setColorTheme).toHaveBeenCalled()
	})

	it('should render color dots with correct classes', () => {
		const {container} = render(<ColorSwitcher />)

		const wrapper = container.querySelector('div')
		fireEvent.mouseEnter(wrapper!)

		const desktopDots = container.querySelectorAll('.md\\:flex span')
		expect(desktopDots.length).toBe(4)

		const classNames = Array.from(desktopDots).map((dot) => dot.className)
		expect(classNames.some((c) => c.includes('bg-blue-500'))).toBe(true)
		expect(classNames.some((c) => c.includes('bg-amber-500'))).toBe(true)
		expect(classNames.some((c) => c.includes('bg-teal-500'))).toBe(true)
		expect(classNames.some((c) => c.includes('bg-purple-500'))).toBe(true)
	})

	it('should have a mobile toggle button that cycles colors', () => {
		const {container} = render(<ColorSwitcher />)

		const mobileButton = container.querySelector('.md\\:hidden')
		expect(mobileButton).not.toBeNull()

		fireEvent.click(mobileButton!)
		expect(window.__setColorTheme).toHaveBeenCalledWith('amber')
	})
})
