import {describe, it, expect} from 'vitest'
import {render} from '@testing-library/react'
import Logo from '../Logo'

describe('Logo component', () => {
	it('should render author name in h1 with link to homepage', () => {
		const {container} = render(<Logo />)

		const h1 = container.querySelector('h1')
		expect(h1).toBeDefined()
		expect(h1?.textContent).toBe('Ahmed El Gabri')

		const link = container.querySelector('a')
		expect(link).toBeDefined()
		expect(link?.getAttribute('href')).toBe('/')
	})
})
