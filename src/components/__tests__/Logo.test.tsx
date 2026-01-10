import {describe, it, expect} from 'vitest'
import {render} from '@testing-library/react'
import Logo from '../Logo'

describe('Logo component', () => {
	it('should render author name with link to homepage', () => {
		const {container} = render(<Logo />)

		const link = container.querySelector('a')
		expect(link).toBeDefined()
		expect(link?.getAttribute('href')).toBe('/')
		expect(link?.textContent).toContain('ahmed-el-gabri')
	})

	it('should render with blog slug when provided', () => {
		const {container} = render(<Logo slug="my-post" />)

		const link = container.querySelector('a')
		expect(link?.textContent).toContain('ahmed-el-gabri')
		expect(link?.getAttribute('href')).toBe('/')

		const wrapper = container.querySelector('div')
		expect(wrapper?.textContent).toContain('/blog/')
		expect(wrapper?.textContent).toContain('my-post')
	})
})
