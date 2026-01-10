import {describe, it, expect} from 'vitest'
import {render} from '@testing-library/react'
import YouTube from '../YouTube'

describe('YouTube component', () => {
	it('should render iframe with video id', () => {
		const {container} = render(<YouTube id="dQw4w9WgXcQ" />)

		const iframe = container.querySelector('iframe')
		expect(iframe).toBeDefined()
		expect(iframe?.src).toContain('dQw4w9WgXcQ')
	})

	it('should use video id as title when no title provided', () => {
		const {container} = render(<YouTube id="test123" />)

		const iframe = container.querySelector('iframe')
		expect(iframe?.title).toBe('test123')
	})

	it('should use custom title when provided', () => {
		const {container} = render(<YouTube id="test123" title="My Video" />)

		const iframe = container.querySelector('iframe')
		expect(iframe?.title).toBe('My Video')
	})

	it('should have correct YouTube embed URL', () => {
		const {container} = render(<YouTube id="abc123" />)

		const iframe = container.querySelector('iframe')
		expect(iframe?.src).toBe('https://www.youtube.com/embed/abc123?rel=0')
	})

	it('should have allowFullScreen attribute', () => {
		const {container} = render(<YouTube id="test" />)

		const iframe = container.querySelector('iframe')
		expect(iframe?.hasAttribute('allowFullScreen')).toBe(true)
	})

	it('should have 16:9 aspect ratio container', () => {
		const {container} = render(<YouTube id="test" />)

		const wrapper = container.querySelector('div')
		expect(wrapper?.style.paddingBottom).toBe('56.25%')
	})

	it('should have responsive iframe dimensions', () => {
		const {container} = render(<YouTube id="test" />)

		const iframe = container.querySelector('iframe')
		expect(iframe?.className).toContain('absolute')
		expect(iframe?.className).toContain('w-full')
		expect(iframe?.className).toContain('h-full')
	})

	it('should disable related videos', () => {
		const {container} = render(<YouTube id="test" />)

		const iframe = container.querySelector('iframe')
		expect(iframe?.src).toContain('rel=0')
	})
})
