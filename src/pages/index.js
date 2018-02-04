// @flow
import React from 'react'
import { css, injectGlobal } from 'emotion'
import Meta from '../components/Meta'
import Logo from '../components/Logo'
import PostList from '../components/PostList'
import Talks from '../components/Talks'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { globalStyles } from '../utils/style'

injectGlobal`${globalStyles}`

export default props => {
  const { author, social, talks, title, siteUrl } = props.data.site.siteMetadata
  const posts = props.data.allMarkdownRemark.edges
  return (
    <div>
      <div
        className={css`
          padding-bottom: 1rem;
          margin-bottom: 1rem;
        `}
      >
        <Meta title={`${author} | ${title}`} url={siteUrl} />
        <Logo />
        <div
          className={css`
            padding-top: 1rem;
            padding-bottom: 1rem;
          `}
        >
          <h1>{author}</h1>
          <p>
            Front-end engineer, Lead Front-end at{' '}
            <a target="_blank" href="http://lightspeedhq.com">
              Lightspeed
            </a>
            <br />
            Based in Amsterdam, The Netherlands.
          </p>
        </div>
        <Contact social={social} />
      </div>
      <div
        className={css`
          @media screen and (min-width: 48em) {
            display: flex;
          }

          > div {
            @media screen and (min-width: 48em) {
              margin-right: 4rem;
            }

            flex-basis: 50%;
          }
        `}
      >
        <div>
          <PostList posts={posts} />
        </div>
        <div>
          <Talks talks={talks} />
        </div>
      </div>
      <Footer author={author} />
    </div>
  )
}

export const pageQuery = graphql`
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
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/articles/" } }
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
`
