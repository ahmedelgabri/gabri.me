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

	it('should show all color options on hover', () => {
		const {container} = render(<ColorSwitcher />)

		const wrapper = container.querySelector('div')
		expect(wrapper).toBeDefined()

		fireEvent.mouseEnter(wrapper!)

		const buttons = container.querySelectorAll('button')
		expect(buttons.length).toBe(4)
	})

	it('should call setColorTheme when clicking a color option', () => {
		const {container} = render(<ColorSwitcher />)

		const wrapper = container.querySelector('div')
		fireEvent.mouseEnter(wrapper!)

		const buttons = container.querySelectorAll('button')
		fireEvent.click(buttons[1])

		expect(window.__setColorTheme).toHaveBeenCalled()
	})

	it('should call onHover callback when hovering', () => {
		const onHover = vi.fn()
		const {container} = render(<ColorSwitcher onHover={onHover} />)

		const wrapper = container.querySelector('div')
		fireEvent.mouseEnter(wrapper!)

		expect(onHover).toHaveBeenCalledWith(true)
	})

	it('should not expand when disabled', () => {
		const onHover = vi.fn()
		const {container} = render(<ColorSwitcher onHover={onHover} disabled />)

		const wrapper = container.querySelector('div')
		fireEvent.mouseEnter(wrapper!)

		expect(onHover).not.toHaveBeenCalled()
	})

	it('should render color dots with correct classes', () => {
		const {container} = render(<ColorSwitcher />)

		const wrapper = container.querySelector('div')
		fireEvent.mouseEnter(wrapper!)

		const colorDots = container.querySelectorAll('span')
		expect(colorDots.length).toBe(4)

		const classNames = Array.from(colorDots).map((dot) => dot.className)
		expect(classNames.some((c) => c.includes('bg-blue-500'))).toBe(true)
		expect(classNames.some((c) => c.includes('bg-amber-500'))).toBe(true)
		expect(classNames.some((c) => c.includes('bg-teal-500'))).toBe(true)
		expect(classNames.some((c) => c.includes('bg-purple-500'))).toBe(true)
	})
})
