export interface Design {
	id: number
	slug: string
	name: string
	tagline: string
}

export const designs: Design[] = [
	{
		id: 1,
		slug: 'zellij',
		name: 'Zellij',
		tagline: 'Islamic geometry — ivory day, Blue Quran night',
	},
]

const DESIGN_PREFIX = /^\/(1)(?=\/|$)/

/* Design routes only exist for the home page and blog posts */
const MAPPABLE_SUBPATH = /^\/blog\//

function normalize(pathname: string): string {
	const stripped = pathname.replace(/\/+$/, '')
	return stripped === '' ? '/' : stripped
}

function subPath(pathname: string): string {
	const path = normalize(pathname)
	const match = DESIGN_PREFIX.exec(path)
	const rest = match ? path.slice(match[0].length) : path
	return rest === '' ? '/' : rest
}

export function activeDesignId(pathname: string): number | null {
	const match = DESIGN_PREFIX.exec(normalize(pathname))
	return match ? Number(match[1]) : null
}

export function designPath(id: number, pathname: string): string {
	const rest = subPath(pathname)
	if (rest !== '/' && MAPPABLE_SUBPATH.test(rest)) {
		return `/${id}${rest}`
	}
	return `/${id}`
}

export function mainSitePath(pathname: string): string {
	const path = normalize(pathname)
	if (!DESIGN_PREFIX.test(path)) {
		return path
	}
	const rest = subPath(path)
	/* Blog posts are the only sub-pages a design and the main site share */
	if (MAPPABLE_SUBPATH.test(rest)) {
		return rest
	}
	return '/'
}
