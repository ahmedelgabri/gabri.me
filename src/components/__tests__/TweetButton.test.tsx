import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import TweetButton from '../TweetButton'

describe('TweetButton component', () => {
	const defaultProps = {
		via: '@AhmedElGabri',
		title: 'Test Post Title',
		url: 'https://gabri.me/blog/test',
	}

	it('should render tweet link', () => {
		render(<TweetButton {...defaultProps} />)

		const link = screen.getByText('tweet')
		expect(link).toBeDefined()
	})

	it('should construct correct Twitter share URL', () => {
		const {container} = render(<TweetButton {...defaultProps} />)

		const tweetLink = screen.getByText('tweet').closest('a')
		const href = tweetLink?.getAttribute('href')

		expect(href).toContain('https://twitter.com/share')
		expect(href).toContain('url=https://gabri.me/blog/test')
		expect(href).toContain('via=AhmedElGabri') // @ is stripped
		expect(href).toContain('text=Test Post Title')
	})

	it('should strip @ symbol from via parameter', () => {
		render(<TweetButton {...defaultProps} via="@testuser" />)

		const tweetLink = screen.getByText('tweet').closest('a')
		const href = tweetLink?.getAttribute('href')

		expect(href).toContain('via=testuser')
		expect(href).not.toContain('via=@testuser')
	})

	it('should open link in new tab', () => {
		render(<TweetButton {...defaultProps} />)

		const tweetLink = screen.getByText('tweet').closest('a')

		expect(tweetLink?.getAttribute('target')).toBe('_blank')
		expect(tweetLink?.getAttribute('rel')).toBe('noopener noreferrer')
	})

	it('should render Twitter/X icon', () => {
		const {container} = render(<TweetButton {...defaultProps} />)

		const icon = container.querySelector('i.i-tabler\\:brand-x')
		expect(icon).toBeDefined()
	})

	it('should include link to Twitter profile', () => {
		render(<TweetButton {...defaultProps} />)

		const profileLink = screen.getByText('@ahmedelgabri').closest('a')

		expect(profileLink?.getAttribute('href')).toContain('twitter.com')
		expect(profileLink?.getAttribute('target')).toBe('_blank')
		expect(profileLink?.getAttribute('rel')).toBe('noopener noreferrer')
	})

	it('should have separator border styling', () => {
		const {container} = render(<TweetButton {...defaultProps} />)

		const wrapper = container.querySelector('div')
		expect(wrapper?.className).toContain('border-t')
		expect(wrapper?.className).toContain('pt-8')
		expect(wrapper?.className).toContain('mt-8')
	})
})
