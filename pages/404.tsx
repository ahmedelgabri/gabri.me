import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import Back from '../components/Back'
import Footer from '../components/Footer'

export default function Error() {
  return (
    <Layout>
      <Head>
        <title>Oops - page not found 🙈</title>
      </Head>
      <Back />
      <h2>Sorry! 😰, this page was not found.</h2>
      <Image src="/img/404.gif" alt="" unsized style={{maxWidth: '100%'}} />
      <Footer />
    </Layout>
  )
}
