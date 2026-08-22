import {describe, it, expect} from 'vitest'
import {designs, activeDesignId, designPath, mainSitePath} from '../designs'

describe('designs registry', () => {
	it('contains a single design with id 1', () => {
		expect(designs).toHaveLength(1)
		expect(designs.map((d) => d.id)).toEqual([1])
	})

	it('describes the zellij design', () => {
		const [zellij] = designs
		expect(zellij.slug).toBe('zellij')
		expect(zellij.name).toBe('Zellij')
	})

	it('has unique slugs', () => {
		const slugs = designs.map((d) => d.slug)
		expect(new Set(slugs).size).toBe(slugs.length)
	})

	it('has a name and tagline for every design', () => {
		for (const design of designs) {
			expect(design.name).toBeTruthy()
			expect(design.tagline).toBeTruthy()
		}
	})
})

describe('activeDesignId', () => {
	it('returns the design id for the design home page', () => {
		expect(activeDesignId('/1')).toBe(1)
	})

	it('returns the design id for design sub-pages', () => {
		expect(activeDesignId('/1/blog/git-wt')).toBe(1)
		expect(activeDesignId('/1/some-unknown-page')).toBe(1)
	})

	it('handles trailing slashes', () => {
		expect(activeDesignId('/1/')).toBe(1)
		expect(activeDesignId('/1/blog/git-wt/')).toBe(1)
	})

	it('returns null on the main site', () => {
		expect(activeDesignId('/')).toBeNull()
		expect(activeDesignId('/blog/git-wt')).toBeNull()
		expect(activeDesignId('/404')).toBeNull()
	})

	it('returns null for the designs that were removed', () => {
		expect(activeDesignId('/2')).toBeNull()
		expect(activeDesignId('/5/blog/git-wt')).toBeNull()
		expect(activeDesignId('/6')).toBeNull()
	})

	it('does not match multi-digit or non-design prefixes', () => {
		expect(activeDesignId('/10')).toBeNull()
		expect(activeDesignId('/1x')).toBeNull()
		expect(activeDesignId('/11/blog/git-wt')).toBeNull()
	})
})

describe('designPath', () => {
	it('maps the main home page to the design home page', () => {
		expect(designPath(1, '/')).toBe('/1')
	})

	it('maps a main blog post to the same post in the design', () => {
		expect(designPath(1, '/blog/git-wt')).toBe('/1/blog/git-wt')
	})

	it('keeps you on the same page when already inside the design', () => {
		expect(designPath(1, '/1')).toBe('/1')
		expect(designPath(1, '/1/blog/git-wt')).toBe('/1/blog/git-wt')
	})

	it('handles trailing slashes', () => {
		expect(designPath(1, '/1/')).toBe('/1')
		expect(designPath(1, '/blog/git-wt/')).toBe('/1/blog/git-wt')
		expect(designPath(1, '/1/blog/git-wt/')).toBe('/1/blog/git-wt')
	})

	it('falls back to the design home page for unmapped paths', () => {
		expect(designPath(1, '/404')).toBe('/1')
		expect(designPath(1, '/card')).toBe('/1')
		expect(designPath(1, '/1/some-unknown-page')).toBe('/1')
	})

	it('no longer maps weekly links into the design', () => {
		expect(designPath(1, '/weekly-links/weekly-links-v-1')).toBe('/1')
	})
})

describe('mainSitePath', () => {
	it('maps the design home page to the main home page', () => {
		expect(mainSitePath('/1')).toBe('/')
		expect(mainSitePath('/1/')).toBe('/')
	})

	it('maps a design blog post to the main blog post', () => {
		expect(mainSitePath('/1/blog/git-wt')).toBe('/blog/git-wt')
		expect(mainSitePath('/1/blog/git-wt/')).toBe('/blog/git-wt')
	})

	it('maps any other design sub-page to the main home page', () => {
		expect(mainSitePath('/1/some-unknown-page')).toBe('/')
		expect(mainSitePath('/1/weekly-links/weekly-links-v-1')).toBe('/')
		expect(mainSitePath('/1/anything-else')).toBe('/')
	})

	it('keeps main site paths unchanged', () => {
		expect(mainSitePath('/')).toBe('/')
		expect(mainSitePath('/blog/git-wt')).toBe('/blog/git-wt')
		expect(mainSitePath('/404')).toBe('/404')
		expect(mainSitePath('/2/blog/git-wt')).toBe('/2/blog/git-wt')
	})
})
