import * as React from 'react'
import Link from 'next/link'
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import H from '../components/Prose/H'
import meta from '../config/meta'

const {author, social, talks, interviews, title, siteUrl} = meta

export default function Index() {
  return (
    <Layout>
      <Meta title={`${author} | ${title}`} url={siteUrl} />
      <Header />
      <H level="2">Hi. 👋</H>
      <div className="mb-12">
        <p className="tracking-tight mb-6">
          I'm a software engineer, specializing in front-end, based in
          Amsterdam, the Netherlands. With over a decade of experience in
          building products & leading/building teams.
        </p>
        <p className="tracking-tight mb-6">
          Currently Tech Lead, Platform at{' '}
          <a target="_blank" rel="noreferrer noopener" href="http://miro.com">
            Miro
          </a>
          .
        </p>
        <p className="tracking-tight">
          Sometimes I{' '}
          <Link href="/blog">
            <a>write</a>
          </Link>
          , give{' '}
          <a
            href={`https://www.youtube.com/watch?v=${talks.AmsterdamJS[1]}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            talks
          </a>{' '}
          or{' '}
          <a
            href={interviews.devtomanager[1]}
            target="_blank"
            rel="noreferrer noopener"
          >
            talk to other people
          </a>
          .
        </p>
      </div>
      <Contact social={social} />
      <Footer />
    </Layout>
  )
}
