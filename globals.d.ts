// This file is used to hold ambient type declarations, as well as type shims
// for npm module without type declarations, and assets files.

// For example, to shim modules without declarations, use:
// declare module "package-without-declarations"

// And to shim assets, use (one file extension per `declare`):
// declare module "*.png"

declare module 'ahmedelgabri' {
	export function getCard(): string
	export function getPlainCard(): string
}

declare module '*.png'
declare module '*.svg'
declare module '*.gif'
declare module '*.jpg'

declare type ThemeSetting = 'system' | 'light' | 'dark'
declare type ResolvedTheme = 'light' | 'dark'

interface Window {
	gtag: any
	twttr: any
	__zjTheme: ResolvedTheme
	__zjThemeSetting: ThemeSetting
	__zjSetTheme(setting: ThemeSetting): void
}

// Global/Shared Props
interface PostT {
	title: string
	slug: string
	date: string
}

type ContactT = 'twitter' | 'github' | 'email' | 'linkedin'

interface ActivityT {
	[key: string]: string[]
}

type SocialT = {
	[key in ContactT]: {
		name?: string
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
	talks: ActivityT
	interviews: ActivityT
}
