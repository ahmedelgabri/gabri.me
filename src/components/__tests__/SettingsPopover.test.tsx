import {describe, it, expect, beforeEach, vi} from 'vitest'
import {render, fireEvent} from '@testing-library/react'
import {SettingsPopover} from '../Header/SettingsPopover'

describe('SettingsPopover component', () => {
	beforeEach(() => {
		window.__themeSetting = 'dark'
		window.__theme = 'dark'
		window.__colorTheme = 'blue'
		window.__fontTheme = 'mono'
		window.__setTheme = vi.fn((setting: ThemeSetting) => {
			window.__themeSetting = setting
		})
		window.__setColorTheme = vi.fn((color: ColorTheme) => {
			window.__colorTheme = color
		})
		window.__setFontTheme = vi.fn((font: FontTheme) => {
			window.__fontTheme = font
		})
	})

	it('should render the settings button', () => {
		const {container} = render(<SettingsPopover />)
		const button = container.querySelector('button')
		expect(button).not.toBeNull()
	})

	it('should show popover when button is clicked', () => {
		const {container} = render(<SettingsPopover />)
		const button = container.querySelector('button')

		fireEvent.click(button!)

		const popover = container.querySelector('.absolute')
		expect(popover).not.toBeNull()
	})

	it('should hide popover when clicking outside', () => {
		const {container} = render(<SettingsPopover />)
		const button = container.querySelector('button')

		fireEvent.click(button!)
		expect(container.querySelector('.absolute')).not.toBeNull()

		fireEvent.mouseDown(document.body)
		expect(container.querySelector('.absolute')).toBeNull()
	})

	it('should hide popover when pressing Escape', () => {
		const {container} = render(<SettingsPopover />)
		const button = container.querySelector('button')

		fireEvent.click(button!)
		expect(container.querySelector('.absolute')).not.toBeNull()

		fireEvent.keyDown(document, {key: 'Escape'})
		expect(container.querySelector('.absolute')).toBeNull()
	})

	it('should have theme options in popover', () => {
		const {container} = render(<SettingsPopover />)
		const button = container.querySelector('button')

		fireEvent.click(button!)

		const themeButtons = container.querySelectorAll('.absolute button')
		expect(themeButtons.length).toBeGreaterThanOrEqual(3)
	})

	it('should call setTheme when clicking a theme option', () => {
		const {container} = render(<SettingsPopover />)
		const button = container.querySelector('button')

		fireEvent.click(button!)

		const themeButtons = container.querySelectorAll('.absolute button')
		fireEvent.click(themeButtons[1])

		expect(window.__setTheme).toHaveBeenCalled()
	})

	it('should call setColorTheme when clicking a color option', () => {
		const {container} = render(<SettingsPopover />)
		const button = container.querySelector('button')

		fireEvent.click(button!)

		const allButtons = container.querySelectorAll('.absolute button')
		fireEvent.click(allButtons[4])

		expect(window.__setColorTheme).toHaveBeenCalled()
	})

	it('should call setFontTheme when clicking a font option', () => {
		const {container} = render(<SettingsPopover />)
		const button = container.querySelector('button')

		fireEvent.click(button!)

		const allButtons = container.querySelectorAll('.absolute button')
		fireEvent.click(allButtons[8])

		expect(window.__setFontTheme).toHaveBeenCalled()
	})

	it('should display the trigger button with current font and color', () => {
		const {container} = render(<SettingsPopover />)
		const triggerButton = container.querySelector('button')
		const letterSpan = triggerButton?.querySelector('span')

		expect(letterSpan?.textContent).toBe('A')
		expect(letterSpan?.className).toContain('font-mono')
		expect(letterSpan?.className).toContain('text-blue-500')
	})
})
