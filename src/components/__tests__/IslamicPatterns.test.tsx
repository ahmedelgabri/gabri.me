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

	it('should render shamsa pattern with 13 shamsas (39 rects total)', () => {
		const {container} = render(<IslamicPattern />)

		const rects = container.querySelectorAll('rect')
		// 12 satellite shamsas + 1 center shamsa = 13 shamsas
		// Each shamsa has 3 rects: 13 × 3 = 39
		expect(rects.length).toBe(39)
	})

	it('should have center shamsa with rects rotated at 0, 30, and 60 degrees', () => {
		const {container} = render(<IslamicPattern />)

		const rects = container.querySelectorAll('rect')
		const transforms = Array.from(rects).map((r) => r.getAttribute('transform'))

		// Center shamsa at (100, 100)
		expect(transforms).toContain(null)
		expect(transforms).toContain('rotate(30 100 100)')
		expect(transforms).toContain('rotate(60 100 100)')
	})

	it('should have satellite shamsas with reduced opacity', () => {
		const {container} = render(<IslamicPattern />)

		const groups = container.querySelectorAll('g[opacity="0.4"]')
		// 12 satellite shamsas should have opacity 0.4
		expect(groups.length).toBe(12)
	})
})
