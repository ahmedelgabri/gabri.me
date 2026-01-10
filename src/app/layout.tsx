import * as React from 'react'
import type {Metadata, Viewport} from 'next'
import {GA} from '../lib/gtag'
import siteMeta from '../config/siteMeta'

import '../style/style.css'
import '../style/prism-plain.css'

const themeScript = `(${(() => {
	var STORAGE_KEY = 'theme'
	var VALID_THEMES = ['system', 'light', 'dark']
	var DEFAULT_THEME = 'dark'

	var storedTheme
	try {
		storedTheme = localStorage.getItem(STORAGE_KEY)
	} catch (e) {}

	// @ts-ignore
	var themeSetting = VALID_THEMES.includes(storedTheme)
		? storedTheme
		: DEFAULT_THEME
	// @ts-ignore
	window.__themeSetting = themeSetting

	function getSystemTheme() {
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	}

	function resolveTheme() {
		return window.__themeSetting === 'system'
			? getSystemTheme()
			: window.__themeSetting
	}

	// @ts-ignore
	function applyTheme(theme) {
		window.__theme = theme
		document.documentElement.classList.remove('light', 'dark')
		document.documentElement.classList.add(theme)
	}

	applyTheme(resolveTheme())

	window.__setTheme = function (newSetting) {
		window.__themeSetting = newSetting
		try {
			localStorage.setItem(STORAGE_KEY, newSetting)
		} catch (e) {}
		applyTheme(resolveTheme())
	}

	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', function () {
			if (window.__themeSetting === 'system') {
				applyTheme(resolveTheme())
			}
		})
}).toString()})()`

const {description, social, twitterId, siteUrl, author, title} = siteMeta

const fullTitle = `${author} | ${title}`

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		template: `${fullTitle} - %s`,
		default: fullTitle,
	},
	description,
	openGraph: {
		title: fullTitle,
		description,
		url: siteUrl,
		images: '/img/fb-image.jpg',
		type: 'website',
		siteName: author,
		// @NOTE move to config
		locale: 'en-US',
	},
	alternates: {
		canonical: siteUrl,
	},
	// @TODO
	// keywords: ['Next.js', 'React', 'JavaScript'],
	authors: [{name: author, url: siteUrl}],
	creator: author,
	publisher: author,
	appleWebApp: {
		title: 'Gabri.me',
		statusBarStyle: 'black-translucent',
	},
	twitter: {
		// @ts-ignore
		card: 'summary_large_image',
		title: fullTitle,
		description,
		siteId: twitterId,
		creator: social.twitter.display,
		creatorId: twitterId,
		images: ['/i/social-image.jpg'],
		// @ts-ignore
		domain: siteUrl,
	},
	other: {
		'application-name': 'Gabri.me',
		'fediverse:creator': '@gabri@mastodon.online',
	},
}

export const viewport: Viewport = {
	themeColor: '#1f2325',
	colorScheme: 'dark light',
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	viewportFit: 'cover',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" className="dark font-mono" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{__html: themeScript}} />
				{Object.entries(social).map(([, {url}]) => (
					<link key={url} href={url} rel="me" />
				))}
				<GA />
			</head>
			<body className="bg-neutral-100 p-6 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 md:p-8 lg:p-12">
				<div className="w-content">{children}</div>
			</body>
		</html>
	)
}
