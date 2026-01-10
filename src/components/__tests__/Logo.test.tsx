import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import Logo from '../Logo'

describe('Logo component', () => {
	it('should render the author name', () => {
		render(<Logo />)

		expect(screen.getByText('Ahmed El Gabri')).toBeDefined()
	})

	it('should render as an h1 element', () => {
		const {container} = render(<Logo />)

		const h1 = container.querySelector('h1')
		expect(h1).toBeDefined()
		expect(h1?.textContent).toBe('Ahmed El Gabri')
	})

	it('should render a link to homepage', () => {
		const {container} = render(<Logo />)

		const link = container.querySelector('a')
		expect(link).toBeDefined()
		expect(link?.getAttribute('href')).toBe('/')
	})

	it('should have correct styling classes', () => {
		const {container} = render(<Logo />)

		const link = container.querySelector('a')
		expect(link?.className).toContain('block')
		expect(link?.className).toContain('p-3')

		const h1 = container.querySelector('h1')
		expect(h1?.className).toContain('text-sm')
		expect(h1?.className).toContain('leading-none')
	})
})
