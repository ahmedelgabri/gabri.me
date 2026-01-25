import {describe, it, expect} from 'vitest'
import siteMeta from '../siteMeta'

describe('siteMeta', () => {
	describe('required fields', () => {
		it('has title', () => {
			expect(siteMeta.title).toBe('Software Engineer')
		})

		it('has author', () => {
			expect(siteMeta.author).toBe('Ahmed El Gabri')
		})

		it('has siteUrl', () => {
			expect(siteMeta.siteUrl).toBe('https://gabri.me')
		})

		it('has description', () => {
			expect(siteMeta.description).toContain('Ahmed El Gabri')
			expect(siteMeta.description).toContain('Software engineer')
		})

		it('has twitterId', () => {
			expect(siteMeta.twitterId).toBe('1512909779')
		})
	})

	describe('social links', () => {
		it('has github with valid URL', () => {
			expect(siteMeta.social.github.display).toBe('ahmedelgabri')
			expect(siteMeta.social.github.url).toMatch(/^https:\/\/github\.com\//)
		})

		it('has linkedin with valid URL', () => {
			expect(siteMeta.social.linkedin.display).toBe('ahmedelgabri')
			expect(siteMeta.social.linkedin.url).toMatch(
				/^https:\/\/www\.linkedin\.com\/in\//,
			)
		})

		it('has twitter with valid URL', () => {
			expect(siteMeta.social.twitter.display).toBe('@ahmedelgabri')
			expect(siteMeta.social.twitter.url).toMatch(/twitter\.com\//)
		})

		it('has email with mailto URL', () => {
			expect(siteMeta.social.email.display).toContain('@gabri.me')
			expect(siteMeta.social.email.url).toMatch(/^mailto:/)
		})

		it('has resume with Google Docs export URL', () => {
			expect(siteMeta.social.resume.display).toBe('Resume')
			expect(siteMeta.social.resume.url).toMatch(/docs\.google\.com/)
		})
	})

	describe('talks', () => {
		it('has AmsterdamJS talk with URL and video ID', () => {
			expect(siteMeta.talks.AmsterdamJS).toHaveLength(2)
			expect(siteMeta.talks.AmsterdamJS[0]).toMatch(/^https?:\/\//)
			expect(siteMeta.talks.AmsterdamJS[1]).toBeTruthy()
		})
	})

	describe('interviews', () => {
		it('has interview entries with title and URL', () => {
			const interviewKeys = Object.keys(siteMeta.interviews)
			expect(interviewKeys.length).toBeGreaterThan(0)

			for (const key of interviewKeys) {
				const interview =
					siteMeta.interviews[key as keyof typeof siteMeta.interviews]
				expect(interview).toHaveLength(2)
				expect(typeof interview[0]).toBe('string') // title
				expect(interview[1]).toMatch(/^https?:\/\//) // URL
			}
		})
	})
})
