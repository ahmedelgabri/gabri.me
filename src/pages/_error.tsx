import * as React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Error() {
  return (
    <Layout>
      <Head>
        <title>Oops - page not found 🙈</title>
      </Head>
      <Header />
      <h2>Sorry! 😰, this page was not found.</h2>
      <img src="/img/404.gif" alt="" style={{maxWidth: '100%'}} />
      <Footer />
    </Layout>
  )
}
