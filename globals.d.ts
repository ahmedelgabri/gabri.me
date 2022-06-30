// This file is used to hold ambient type declarations, as well as type shims
// for npm module without type declarations, and assets files.

// For example, to shim modules without declarations, use:
// declare module "package-without-declarations"

// And to shim assets, use (one file extension per `declare`):
// declare module "*.png"

declare module 'unified'
declare module 'remark-parse'
declare module 'remark-rehype'
declare module 'rehype-raw'
declare module 'rehype-sanitize'
declare module 'rehype-stringify'
declare module 'mdx-prism'
declare module 'ahmedelgabri' {
	export function getCard(): string
	export function getPlainCard(): string
}

declare module '*.png'
declare module '*.svg'
declare module '*.gif'
declare module '*.jpg'

declare type Theme = 'dark' | 'light'

interface Window {
	gtag: any
	twttr: any
	__onThemeChange(theme?: Theme): void
	__theme: Theme
	__setPreferredTheme(theme: Theme): void
}

// Global/Shared Props
interface PostT {
	title: string
	slug: string
	date: string
}

enum ContactT {
	'twitter',
	'github',
	'email',
	'linkedin',
	'resume',
}

interface ActivityT {
	[key: string]: string[]
}

interface SocialT {
	[key in ContactT]: {
		display: string
		url: string
	}
}

interface SiteMetaT {
	author: string
	title: string
	siteUrl: string
	description: string
	social: SocialT
	talks: Activity
	interviews: Activity
}
