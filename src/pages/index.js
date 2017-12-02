// @flow
import React from 'react'
import { css } from 'emotion'
import Meta from '../components/Meta'
import Logo from '../components/Logo'
import PostList from '../components/PostList'
import Talks from '../components/Talks'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default props => {
  const { author, social, talks, title, siteUrl } = props.data.site.siteMetadata
  const posts = props.data.allMarkdownRemark.edges
  return (
    <div>
      <div
        className={css`
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        `}
      >
        <Meta title={`${author} | ${title}`} url={siteUrl} />
        <Logo
          className={css`
            width: 50px;
            display: inline-block;
            opacity: 0.3;
            transition: all 0.2s linear;
            &:hover {
              opacity: 1;
            }
          `}
        />
        <h1>{author}</h1>
        <p>
          Front-end engineer,
          <br />
          Leading the Front-end at {' '}
          <a href="http://lightspeedhq.com">Lightspeed</a>
          <br />
          Based in Amsterdam, The Netherlands.
        </p>
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
          <Talks talks={talks} />
        </div>
        <div>
          <PostList posts={posts} />
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
        twitter_id
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
