import * as React from 'react'
import type {Metadata, Viewport} from 'next'
import {ViewTransitions} from 'next-view-transitions'
import {GA} from '../lib/gtag'
import {IslamicPattern} from '../components/Header/IslamicPatterns'
import siteMeta from '../config/siteMeta'

import '../style/style.css'

const themeScript = `(${(() => {
	var THEME_STORAGE_KEY = 'theme'
	var COLOR_STORAGE_KEY = 'colorTheme'
	var FONT_STORAGE_KEY = 'fontTheme'
	var VALID_THEMES = ['system', 'light', 'dark']
	var VALID_COLORS = ['blue', 'amber', 'teal', 'purple']
	var VALID_FONTS = ['mono', 'serif', 'sans']
	var DEFAULT_THEME = 'dark'
	var DEFAULT_COLOR = 'blue'
	var DEFAULT_FONT = 'mono'

	var storedTheme
	var storedColor
	var storedFont
	try {
		storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
		storedColor = localStorage.getItem(COLOR_STORAGE_KEY)
		storedFont = localStorage.getItem(FONT_STORAGE_KEY)
	} catch (e) {}

	// @ts-ignore
	var themeSetting = VALID_THEMES.includes(storedTheme)
		? storedTheme
		: DEFAULT_THEME
	// @ts-ignore
	var colorTheme = VALID_COLORS.includes(storedColor)
		? storedColor
		: DEFAULT_COLOR
	// @ts-ignore
	var fontTheme = VALID_FONTS.includes(storedFont) ? storedFont : DEFAULT_FONT

	// @ts-ignore
	window.__themeSetting = themeSetting
	// @ts-ignore
	window.__colorTheme = colorTheme
	// @ts-ignore
	window.__fontTheme = fontTheme

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

	// @ts-ignore
	function applyColorTheme(color) {
		window.__colorTheme = color
		document.documentElement.classList.remove(
			'color-blue',
			'color-amber',
			'color-teal',
			'color-purple',
		)
		if (color !== 'blue') {
			document.documentElement.classList.add('color-' + color)
		}
	}

	// @ts-ignore
	function applyFontTheme(font) {
		window.__fontTheme = font
		document.documentElement.classList.remove(
			'font-mono',
			'font-serif',
			'font-sans',
		)
		document.documentElement.classList.add('font-' + font)
	}

	applyTheme(resolveTheme())
	applyColorTheme(colorTheme)
	applyFontTheme(fontTheme)

	window.__setTheme = function (newSetting) {
		window.__themeSetting = newSetting
		try {
			localStorage.setItem(THEME_STORAGE_KEY, newSetting)
		} catch (e) {}
		applyTheme(resolveTheme())
	}

	window.__setColorTheme = function (newColor) {
		window.__colorTheme = newColor
		try {
			localStorage.setItem(COLOR_STORAGE_KEY, newColor)
		} catch (e) {}
		applyColorTheme(newColor)
	}

	window.__setFontTheme = function (newFont) {
		window.__fontTheme = newFont
		try {
			localStorage.setItem(FONT_STORAGE_KEY, newFont)
		} catch (e) {}
		applyFontTheme(newFont)
	}

	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', function () {
			if (window.__themeSetting === 'system') {
				applyTheme(resolveTheme())
			}
		})

	// Watch for class attribute changes and re-apply our theme classes
	// This handles React hydration and view transitions that may reset classes
	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (mutation.attributeName === 'class') {
				var html = document.documentElement
				var resolved = resolveTheme()
				var hasCorrectTheme = html.classList.contains(resolved)
				var hasCorrectFont = html.classList.contains(
					'font-' + window.__fontTheme,
				)
				var hasCorrectColor =
					window.__colorTheme === 'blue' ||
					html.classList.contains('color-' + window.__colorTheme)

				if (!hasCorrectTheme || !hasCorrectFont || !hasCorrectColor) {
					applyTheme(resolved)
					applyColorTheme(window.__colorTheme)
					applyFontTheme(window.__fontTheme)
				}
			}
		})
	})
	observer.observe(document.documentElement, {attributes: true})
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
		<ViewTransitions>
			<html lang="en" className="dark font-mono" suppressHydrationWarning>
				<head>
					<script dangerouslySetInnerHTML={{__html: themeScript}} />
					{Object.entries(social).map(([, {url}]) => (
						<link key={url} href={url} rel="me" />
					))}
					<GA />
				</head>
				<body className="bg-light-800 p-6 text-dark-950 dark:bg-dark-900 dark:text-light-950 md:p-8 lg:p-12 xl:text-lg 2xl:text-xl">
					<IslamicPattern />
					<div className="w-content">{children}</div>
				</body>
			</html>
		</ViewTransitions>
	)
}
