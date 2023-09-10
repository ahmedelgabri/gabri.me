import * as React from 'react'
/* import Router from 'next/router' */
import type {Metadata} from 'next'
import Script from 'next/script'
import {Inter, Playfair_Display} from 'next/font/google'
import {Preconnect} from './preconnect'
import {pageview, GA} from '../lib/gtag'
import siteMeta from '../config/siteMeta'

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
})

const playfairDisplay = Playfair_Display({
	weight: ['400', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-playfair-display',
})

import '../style/style.css'
import '../style/prism-plain.css'

/* import Router from 'next/router' */
/* Router.events.on('routeChangeComplete', (url) => pageview(url)) */

const {
	description,
	social: {twitter, github, linkedin, mastodon},
	twitterId,
	siteUrl,
	author,
	title,
} = siteMeta

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
	themeColor: '#1f2325',
	colorScheme: 'dark light',
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
		creator: twitter.display,
		creatorId: twitterId,
		images: ['/i/social-image.jpg'],
		// @ts-ignore
		domain: siteUrl,
	},
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
		viewportFit: 'cover',
	},
	other: {
		'application-name': 'Gabri.me',
	},
}

export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang="en"
			className={`text-xl ${inter.variable} ${playfairDisplay.variable}`}
		>
			<head>
				<Preconnect />
				{[twitter, github, linkedin, mastodon].map(({url}) => (
					<link key={url} href={url} rel="me" />
				))}
				<GA />
				<Script
					strategy="beforeInteractive"
					dangerouslySetInnerHTML={{
						__html: `(function() {
  window.__onThemeChange = function() {};

  function setTheme(newTheme) {
    window.__theme = newTheme;
    preferredTheme = newTheme;
    document.documentElement.classList.remove(newTheme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.add(newTheme);
    window.__onThemeChange(newTheme);
  }

  var preferredTheme;
  try {
    preferredTheme = localStorage.getItem('theme');
  } catch (err) { }

  window.__setPreferredTheme = function(newTheme) {
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (err) {}
  }

  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  darkQuery.addListener(function(e) {
    window.__setPreferredTheme(e.matches ? 'dark' : 'light')
  });

  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
})();`,
					}}
				/>
			</head>
			<body className="bg-slate-200 p-4 text-slate-700 dark:bg-zinc-900 dark:text-slate-400 md:p-8">
				{children}
			</body>
		</html>
	)
}
