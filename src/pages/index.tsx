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
            <p className="text-6xl font-extrabold leading-tight tracking-tight">
              Hi. 👋
            </p>
            <p className="mb-4 tracking-tight">
              My name is Ahmed El Gabri, I'm a software engineer, specializing
              in front-end with over a decade of experience in building products
              & leading/building teams.
            </p>
            <p className="mb-4 tracking-tight">
              I'm currently working as a Tech Lead in the Platform team{' '}
              <br className="hidden md:inline-block" /> at{' '}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="http://miro.com"
              >
                Miro
              </a>{' '}
              in Amsterdam, the Netherlands
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
            </p>
          </div>
          <div className="mb-4 lg:w-5/12">
            <Contact social={social} />
          </div>
        </div>
      </div>
      <Footer author={author} />
    </Layout>
  )
}
