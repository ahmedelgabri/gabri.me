import {describe, it, expect} from 'vitest'
import {render} from '@testing-library/react'
import H from '../Prose/H'

describe('H component', () => {
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

	it('should apply font-bold class', () => {
		const {container} = render(<H level="2">Main</H>)

		const h2 = container.querySelector('h2')
		expect(h2?.textContent).toContain('Main')
		expect(h2?.className).toContain('font-bold')
	})
})
