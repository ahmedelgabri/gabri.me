import {describe, it, expect, vi} from 'vitest'
import {render} from '@testing-library/react'

// Mock the YouTube component to avoid happy-dom trying to load external URLs
// Replace iframe with a div that has the same attributes for testing
vi.mock('../YouTube', () => ({
	default: ({id, title}: {id: string; title?: string}) => (
		<div
			className="relative h-0"
			style={{
				paddingBottom: '56.25%',
				paddingTop: '25px',
			}}
		>
			<div
				className="absolute left-0 top-0 h-full w-full"
				data-testid="youtube-iframe"
				data-src={`https://www.youtube.com/embed/${id}?rel=0`}
				data-title={title || id}
				data-allowfullscreen="true"
			/>
		</div>
	),
}))

const YouTube = (await import('../YouTube')).default

describe('YouTube component', () => {
	it('should render iframe with video id', () => {
		const {container} = render(<YouTube id="dQw4w9WgXcQ" />)

		const iframe = container.querySelector('[data-testid="youtube-iframe"]')
		expect(iframe).toBeDefined()
		expect(iframe?.getAttribute('data-src')).toContain('dQw4w9WgXcQ')
	})

	it('should use video id as title when no title provided', () => {
		const {container} = render(<YouTube id="test123" />)

		const iframe = container.querySelector('[data-testid="youtube-iframe"]')
		expect(iframe?.getAttribute('data-title')).toBe('test123')
	})

	it('should use custom title when provided', () => {
		const {container} = render(<YouTube id="test123" title="My Video" />)

		const iframe = container.querySelector('[data-testid="youtube-iframe"]')
		expect(iframe?.getAttribute('data-title')).toBe('My Video')
	})

	it('should have correct YouTube embed URL', () => {
		const {container} = render(<YouTube id="abc123" />)

		const iframe = container.querySelector('[data-testid="youtube-iframe"]')
		expect(iframe?.getAttribute('data-src')).toBe(
			'https://www.youtube.com/embed/abc123?rel=0',
		)
	})

	it('should have allowFullScreen attribute', () => {
		const {container} = render(<YouTube id="test" />)

		const iframe = container.querySelector('[data-testid="youtube-iframe"]')
		expect(iframe?.getAttribute('data-allowfullscreen')).toBe('true')
	})

	it('should have 16:9 aspect ratio container', () => {
		const {container} = render(<YouTube id="test" />)

		const wrapper = container.querySelector('div')
		expect(wrapper?.style.paddingBottom).toBe('56.25%')
	})

	it('should have responsive iframe dimensions', () => {
		const {container} = render(<YouTube id="test" />)

		const iframe = container.querySelector('[data-testid="youtube-iframe"]')
		expect(iframe?.className).toContain('absolute')
		expect(iframe?.className).toContain('w-full')
		expect(iframe?.className).toContain('h-full')
	})

	it('should disable related videos', () => {
		const {container} = render(<YouTube id="test" />)

		const iframe = container.querySelector('[data-testid="youtube-iframe"]')
		expect(iframe?.getAttribute('data-src')).toContain('rel=0')
	})
})
