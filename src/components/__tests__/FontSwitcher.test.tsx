import {describe, it, expect, beforeEach, vi} from 'vitest'
import {render, fireEvent} from '@testing-library/react'
import {FontSwitcher} from '../Header/FontSwitcher'

describe('FontSwitcher component', () => {
	beforeEach(() => {
		window.__fontTheme = 'mono'
		window.__setFontTheme = vi.fn((font: FontTheme) => {
			window.__fontTheme = font
		})
	})

	it('should render the current font indicator', () => {
		const {container} = render(<FontSwitcher />)

		const buttons = container.querySelectorAll('button')
		expect(buttons.length).toBeGreaterThan(0)
	})

	it('should show all desktop font options on hover', () => {
		const {container} = render(<FontSwitcher />)

		const wrapper = container.querySelector('div')
		expect(wrapper).toBeDefined()

		fireEvent.mouseEnter(wrapper!)

		const desktopButtons = container.querySelectorAll('.md\\:flex button')
		expect(desktopButtons.length).toBe(3)
	})

	it('should call setFontTheme when clicking a font option', () => {
		const {container} = render(<FontSwitcher />)

		const wrapper = container.querySelector('div')
		fireEvent.mouseEnter(wrapper!)

		const desktopButtons = container.querySelectorAll('.md\\:flex button')
		fireEvent.click(desktopButtons[1])

		expect(window.__setFontTheme).toHaveBeenCalled()
	})

	it('should render font labels with correct classes', () => {
		const {container} = render(<FontSwitcher />)

		const wrapper = container.querySelector('div')
		fireEvent.mouseEnter(wrapper!)

		const desktopLabels = container.querySelectorAll('.md\\:flex span')
		expect(desktopLabels.length).toBe(3)

		const classNames = Array.from(desktopLabels).map((label) => label.className)
		expect(classNames.some((c) => c.includes('font-mono'))).toBe(true)
		expect(classNames.some((c) => c.includes('font-serif'))).toBe(true)
		expect(classNames.some((c) => c.includes('font-sans'))).toBe(true)
	})

	it('should have a mobile toggle button that cycles fonts', () => {
		const {container} = render(<FontSwitcher />)

		const mobileButton = container.querySelector('.md\\:hidden')
		expect(mobileButton).not.toBeNull()

		fireEvent.click(mobileButton!)
		expect(window.__setFontTheme).toHaveBeenCalledWith('serif')
	})
})
