import * as React from 'react'
import {graphql, Link} from 'gatsby'
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export const query = graphql`
  query indexQuery {
    site {
      siteMetadata {
        author
        title
        siteUrl
        description
        social {
          twitter {
            display
            url
          }
          github {
            display
            url
          }
          email {
            display
            url
          }
          linkedin {
            display
            url
          }
          resume {
            display
            url
          }
        }
        talks {
          AmsterdamJS
        }
        interviews {
          devtomanager
        }
      }
    }
  }
`

export default function Index(props: any) {
  const {
    data: {
      site: {
        siteMetadata: {author, social, talks, interviews, title, siteUrl},
      },
    },
  } = props

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
              Sometimes I <Link to="/blog">write</Link>, give{' '}
              <a
                href={`https://www.youtube.com/watch?v=${talks.AmsterdamJS[1]}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                talks
              </a>{' '}
              or get{' '}
              <a
                href={interviews.devtomanager[1]}
                target="_blank"
                rel="noreferrer noopener"
              >
                interviewed
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
