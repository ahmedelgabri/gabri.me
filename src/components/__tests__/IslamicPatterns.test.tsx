import {describe, it, expect} from 'vitest'
import {render} from '@testing-library/react'
import {IslamicPattern} from '../Header/IslamicPatterns'

describe('IslamicPattern component', () => {
	it('should render an SVG element', () => {
		const {container} = render(<IslamicPattern />)

		const svg = container.querySelector('svg')
		expect(svg).toBeDefined()
		expect(svg).not.toBeNull()
	})

	it('should have aria-hidden for accessibility', () => {
		const {container} = render(<IslamicPattern />)

		const svg = container.querySelector('svg')
		expect(svg?.getAttribute('aria-hidden')).toBe('true')
	})

	it('should have the islamic-pattern class for animation', () => {
		const {container} = render(<IslamicPattern />)

		const svg = container.querySelector('svg')
		expect(svg?.classList.contains('islamic-pattern')).toBe(true)
	})

	it('should use currentColor for stroke', () => {
		const {container} = render(<IslamicPattern />)

		const strokes = container.querySelectorAll('[stroke="currentColor"]')
		expect(strokes.length).toBeGreaterThan(0)
	})

	it('should render shamsa pattern with 3 rects', () => {
		const {container} = render(<IslamicPattern />)

		const rects = container.querySelectorAll('rect')
		expect(rects.length).toBe(3)
	})

	it('should have rects rotated at 0, 30, and 60 degrees', () => {
		const {container} = render(<IslamicPattern />)

		const rects = container.querySelectorAll('rect')
		const transforms = Array.from(rects).map((r) => r.getAttribute('transform'))

		expect(transforms).toContain(null)
		expect(transforms).toContain('rotate(30 50 50)')
		expect(transforms).toContain('rotate(60 50 50)')
	})
})
