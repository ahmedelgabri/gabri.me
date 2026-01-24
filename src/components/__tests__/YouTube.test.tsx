import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import YouTube from '../YouTube'

describe('YouTube', () => {
	it('renders iframe with correct src using video id', () => {
		render(<YouTube id="abc123" />)
		const iframe = screen.getByTitle('abc123')
		expect(iframe).toHaveAttribute(
			'src',
			'https://www.youtube.com/embed/abc123?rel=0',
		)
	})

	it('uses id as title when title prop is not provided', () => {
		render(<YouTube id="xyz789" />)
		expect(screen.getByTitle('xyz789')).toBeInTheDocument()
	})

	it('uses title prop when provided', () => {
		render(<YouTube id="abc123" title="My Video Title" />)
		expect(screen.getByTitle('My Video Title')).toBeInTheDocument()
	})

	it('renders with 16:9 aspect ratio container', () => {
		const {container} = render(<YouTube id="test" />)
		const wrapper = container.firstChild as HTMLElement
		expect(wrapper).toHaveStyle({paddingBottom: '56.25%'})
	})

	it('renders iframe with allowFullScreen attribute', () => {
		render(<YouTube id="test" />)
		const iframe = screen.getByTitle('test')
		expect(iframe).toHaveAttribute('allowFullScreen')
	})

	it('renders iframe with correct dimensions', () => {
		render(<YouTube id="test" />)
		const iframe = screen.getByTitle('test')
		expect(iframe).toHaveAttribute('width', '560')
		expect(iframe).toHaveAttribute('height', '315')
	})
})
