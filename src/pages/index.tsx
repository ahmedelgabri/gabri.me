import * as React from 'react'
import {graphql, Link} from 'gatsby'
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import Logo from '../components/Logo'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import {GoLinkExternal} from 'react-icons/go'

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
        <Logo />
        <div className="lg:w-3/5">
          <div className="prose">
            <p className="text-6xl font-extrabold leading-tight tracking-tight">
              Hi. 👋
            </p>
            <p className="mb-4 tracking-tight">
              My name is Ahmed El Gabri, I'm a software engineer with over a
              decade of experience building products & leading/building teams.
            </p>
            <p className="mb-4 tracking-tight">
              I'm currently working as a Principal Software Developer at{' '}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="http://lightspeedhq.com"
              >
                LightspeedHQ
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
                talks&nbsp;
                <span className="inline-block">
                  <GoLinkExternal size={20} />
                </span>
              </a>{' '}
              or get{' '}
              <a
                href={interviews.devtomanager[1]}
                target="_blank"
                rel="noreferrer noopener"
              >
                interviewed&nbsp;
                <span className="inline-block">
                  <GoLinkExternal size={20} />
                </span>
              </a>
            </p>
          </div>
          <div className="mb-4 lg:w-1/2">
            <Contact social={social} />
          </div>
        </div>
      </div>
      <Footer author={author} />
    </Layout>
  )
}
