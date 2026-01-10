import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import TweetButton from '../TweetButton'

describe('TweetButton component', () => {
	const defaultProps = {
		via: '@AhmedElGabri',
		title: 'Test Post Title',
		url: 'https://gabri.me/blog/test',
	}

	it('should construct correct Twitter share URL with @ stripped', () => {
		render(<TweetButton {...defaultProps} />)

		const tweetLink = screen.getByText('tweet').closest('a')
		const href = tweetLink?.getAttribute('href')

		expect(href).toContain('https://twitter.com/share')
		expect(href).toContain('url=https://gabri.me/blog/test')
		expect(href).toContain('via=AhmedElGabri')
		expect(href).toContain('text=Test Post Title')
		expect(href).not.toContain('via=@')
	})

	it('should open link in new tab with security attributes', () => {
		render(<TweetButton {...defaultProps} />)

		const tweetLink = screen.getByText('tweet').closest('a')

		expect(tweetLink?.getAttribute('target')).toBe('_blank')
		expect(tweetLink?.getAttribute('rel')).toBe('noopener noreferrer')
	})

	it('should include link to Twitter profile', () => {
		render(<TweetButton {...defaultProps} />)

		const profileLink = screen.getByText('@ahmedelgabri').closest('a')

		expect(profileLink?.getAttribute('href')).toContain('twitter.com')
		expect(profileLink?.getAttribute('target')).toBe('_blank')
		expect(profileLink?.getAttribute('rel')).toBe('noopener noreferrer')
	})
})
