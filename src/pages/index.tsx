import * as React from 'react'
import Link from 'next/link'
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import meta from '../config/meta'

const {author, social, talks, interviews, title, siteUrl} = meta

export default function Index() {
  return (
    <Layout>
      <div>
        <Meta title={`${author} | ${title}`} url={siteUrl} />
        <Header />
        <div className="lg:w-5/12">
          <div className="prose">
            <p className="mb-4 text-6xl font-extrabold leading-tight tracking-tight">
              Hi. 👋
            </p>
            <p className="mb-4 tracking-tight">
              I'm a software engineer, specializing in front-end, based in
              Amsterdam, the Netherlands. With over a decade of experience in
              building products & leading/building teams.
            </p>
            <p className="mb-4 tracking-tight">
              Currently Tech Lead, Platform at{' '}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="http://miro.com"
              >
                Miro
              </a>
              .
            </p>
            <p className="mb-4 tracking-tight">
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
          <div className="mb-4 lg:w-5/12">
            <Contact social={social} />
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}
