// @flow
import React from 'react'
import {StaticQuery, graphql} from 'gatsby'
import {css, injectGlobal} from 'emotion'
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import Logo from '../components/Logo'
import PostList from '../components/PostList'
import Talks from '../components/Talks'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import {globalStyles} from '../utils/style'

injectGlobal`${globalStyles}`

export default function Index(props) {
  return (
    <StaticQuery
      query={graphql`
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
                resume {
                  display
                  url
                }
              }
              talks {
                AmsterdamJS
              }
            }
          }
          allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC}
            filter: {fileAbsolutePath: {regex: "/articles/"}}
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `}
      render={data => {
        const {author, social, talks, title, siteUrl} = data.site.siteMetadata
        const posts = data.allMarkdownRemark.edges

        return (
          <Layout>
            <div css={{paddingBottom: '1rem', marginBottom: '1rem'}}>
              <Meta title={`${author} | ${title}`} url={siteUrl} />
              <Logo />
              <div css={{paddingBottom: '1rem', paddingTop: '1rem'}}>
                <h1 css={{fontWeight: 500}}>{author}</h1>
                <p>
                  Principal Software Developer at{' '}
                  <a target="_blank" href="http://lightspeedhq.com">
                    LightspeedHQ
                  </a>
                  <br />
                  Based in Amsterdam, The Netherlands.
                </p>
              </div>
              <Contact social={social} />
            </div>
            <div
              css={{
                '@media screen and (min-width: 48em)': {
                  display: 'flex',
                },

                '> div': {
                  '@media screen and (min-width: 48em)': {
                    marginRight: '4rem',
                  },

                  flexBasis: '50%',
                },
              }}
            >
              <div>
                <PostList posts={posts} />
              </div>
              <div>
                <Talks talks={talks} />
              </div>
            </div>
            <Footer author={author} />
          </Layout>
        )
      }}
    />
  )
}
