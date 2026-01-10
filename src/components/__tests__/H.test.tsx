import {describe, it, expect} from 'vitest'
import {render} from '@testing-library/react'
import H from '../Prose/H'

describe('H component', () => {
	it('should render h1 by default', () => {
		const {container} = render(<H level="1">Test Heading</H>)

		const h1 = container.querySelector('h1')
		expect(h1).toBeDefined()
		expect(h1?.textContent).toContain('Test Heading')
	})

	it('should render different heading levels', () => {
		const levels: Array<'1' | '2' | '3' | '4' | '5' | '6'> = [
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
		]

		levels.forEach((level) => {
			const {container} = render(<H level={level}>Heading {level}</H>)
			const heading = container.querySelector(`h${level}`)

			expect(heading).toBeDefined()
			expect(heading?.textContent).toContain(`Heading ${level}`)
		})
	})

	it('should apply custom className', () => {
		const {container} = render(
			<H level="1" className="custom-class">
				Test
			</H>,
		)

		const h1 = container.querySelector('h1')
		expect(h1?.className).toContain('custom-class')
	})

	it('should apply level-specific styles', () => {
		const {container: container1} = render(<H level="1">H1</H>)
		const {container: container3} = render(<H level="3">H3</H>)

		const h1 = container1.querySelector('h1')
		const h3 = container3.querySelector('h3')

		expect(h1?.className).toContain('text-4xl')
		expect(h3?.className).toContain('text-3xl')
	})

	it('should render extra content when provided', () => {
		const {container} = render(
			<H level="2" extra={<span>Extra</span>}>
				Main
			</H>,
		)

		const h2 = container.querySelector('h2')
		expect(h2?.textContent).toContain('Main')
		expect(h2?.textContent).toContain('Extra')
	})

	it('should apply gradient styling to text', () => {
		const {container} = render(<H level="1">Gradient Text</H>)

		const span = container.querySelector('span')
		expect(span?.className).toContain('bg-gradient-to-br')
		expect(span?.className).toContain('bg-clip-text')
		expect(span?.className).toContain('text-transparent')
	})

	it('should have base styling classes', () => {
		const {container} = render(<H level="1">Test</H>)

		const h1 = container.querySelector('h1')
		expect(h1?.className).toContain('font-serif')
		expect(h1?.className).toContain('font-extrabold')
		expect(h1?.className).toContain('tracking-tight')
	})
})
