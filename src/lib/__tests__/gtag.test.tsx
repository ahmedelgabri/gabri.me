import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest'

describe('gtag utilities', () => {
	const originalEnv = process.env.GA4_TRACKING_ID

	beforeEach(() => {
		// Reset environment and window.gtag before each test
		vi.resetModules()
		delete process.env.GA4_TRACKING_ID
		global.window = {
			gtag: vi.fn(),
		} as any
	})

	afterEach(() => {
		process.env.GA4_TRACKING_ID = originalEnv
	})

	describe('pageview', () => {
		it('should call gtag with config when GA4_TRACKING_ID is set', async () => {
			process.env.GA4_TRACKING_ID = 'G-TEST123'
			const {pageview} = await import('../gtag')

			pageview('/test-page')

			expect(window.gtag).toHaveBeenCalledWith('config', 'G-TEST123', {
				page_path: '/test-page',
				anonymize_ip: true,
			})
		})

		it('should not call gtag when GA4_TRACKING_ID is not set', async () => {
			const {pageview} = await import('../gtag')

			pageview('/test-page')

			expect(window.gtag).not.toHaveBeenCalled()
		})
	})

	describe('event', () => {
		it('should call gtag with event data when GA4_TRACKING_ID is set', async () => {
			process.env.GA4_TRACKING_ID = 'G-TEST123'
			const {event} = await import('../gtag')

			event({
				action: 'click',
				category: 'button',
				label: 'test-button',
				value: 1,
			})

			expect(window.gtag).toHaveBeenCalledWith('event', 'click', {
				event_category: 'button',
				event_label: 'test-button',
				value: 1,
			})
		})

		it('should not call gtag when GA4_TRACKING_ID is not set', async () => {
			const {event} = await import('../gtag')

			event({
				action: 'click',
				category: 'button',
				label: 'test-button',
			})

			expect(window.gtag).not.toHaveBeenCalled()
		})

		it('should handle events with minimal parameters', async () => {
			process.env.GA4_TRACKING_ID = 'G-TEST123'
			const {event} = await import('../gtag')

			event({
				action: 'view',
			})

			expect(window.gtag).toHaveBeenCalledWith('event', 'view', {
				event_category: undefined,
				event_label: undefined,
				value: undefined,
			})
		})
	})
})
