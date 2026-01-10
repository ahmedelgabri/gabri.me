'use client'

import type {Metadata} from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata: Metadata = {
	title: 'Oops - page not found 🙈',
}

export default function Error() {
	return (
		<>
			<Header />
			<h2>Sorry! 😰, this page was not found.</h2>
			<img src="/img/404.gif" alt="" style={{maxWidth: '100%'}} />
			<Footer />
		</>
	)
}
