import * as React from 'react'
import {AppProps} from 'next/app'
import Router from 'next/router'
import Head from 'next/head'
import {pageview} from '../lib/gtag'

import '../style/style.css'
import '../style/prism-plain.css'

Router.events.on('routeChangeComplete', (url) => pageview(url))

export default function MyApp({Component, pageProps}: AppProps) {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
			</Head>
			<Component {...pageProps} />
		</>
	)
}
