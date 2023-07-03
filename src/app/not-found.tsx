import * as React from 'react'
import type {Metadata} from 'next'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata: Metadata = {
	title: 'Oops - page not found 🙈',
}

export default function Error() {
	return (
		<Layout>
			<Header />
			<h2>Sorry! 😰, this page was not found.</h2>
			<img src="/img/404.gif" alt="" style={{maxWidth: '100%'}} />
			<Footer />
		</Layout>
	)
}
