import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import List from '../List'

describe('List component', () => {
	it('should render a list with title', () => {
		const posts = [
			{date: '2024-01-01', item: <div>Post 1</div>},
			{date: '2024-01-02', item: <div>Post 2</div>},
		]

		render(<List title="Recent Posts" posts={posts} />)

		expect(screen.getByText('Recent Posts')).toBeDefined()
	})

	it('should render all posts with dates', () => {
		const posts = [
			{date: '2024-01-01', item: <div>Post 1</div>},
			{date: '2024-01-02', item: <div>Post 2</div>},
		]

		render(<List title="Recent Posts" posts={posts} />)

		expect(screen.getByText('Post 1')).toBeDefined()
		expect(screen.getByText('Post 2')).toBeDefined()
		expect(screen.getByText('2024-01-01')).toBeDefined()
		expect(screen.getByText('2024-01-02')).toBeDefined()
	})

	it('should render empty list when no posts provided', () => {
		render(<List title="Recent Posts" posts={[]} />)

		expect(screen.getByText('Recent Posts')).toBeDefined()
		const listItems = screen.queryAllByRole('listitem')
		expect(listItems.length).toBe(0)
	})

	it('should use date as datetime attribute', () => {
		const posts = [{date: '2024-01-01', item: <div>Post 1</div>}]

		const {container} = render(<List title="Recent Posts" posts={posts} />)

		const timeElement = container.querySelector('time')
		expect(timeElement?.getAttribute('datetime')).toBe('2024-01-01')
	})

	it('should handle posts with same date', () => {
		const posts = [
			{date: '2024-01-01', item: <div>Post 1</div>},
			{date: '2024-01-01', item: <div>Post 2</div>},
		]

		render(<List title="Recent Posts" posts={posts} />)

		expect(screen.getByText('Post 1')).toBeDefined()
		expect(screen.getByText('Post 2')).toBeDefined()
	})
})
