// @flow
import React from 'react'
import colors from 'colors.css'
import { fonts } from '../utils/style'
import Meta from '../components/Meta'
import Back from '../components/Back'
import Footer from '../components/Footer'
import TweetButton from '../components/TweetButton'
import { css } from 'emotion'
import 'prism-themes/themes/prism-atom-dark.css'

const Post = props => {
  const { title, date } = props.data.markdownRemark.frontmatter
  const {
    title: siteTitle,
    author,
    siteUrl,
    social: { twitter: { display } },
  } = props.data.site.siteMetadata
  const { html, excerpt } = props.data.markdownRemark
  const postUrl = `${siteUrl}${props.location.pathname}`
  return (
    <div
      className={css`
        max-width: 45rem;
      `}
    >
      <Meta title={`${title} | ${author} - ${siteTitle}`} excerpt={excerpt} url={postUrl} post />
      <div
        className={css`
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        `}
      >
        <Back />
        <time
          className={css`
            font-style: italic;
            font-size: 0.75rem;
            font-family: ${fonts.serif};
            color: ${colors.gray};
            display: block;
          `}
        >
          On {date}
        </time>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <div
        className={css`
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          padding-top: 1rem;
        `}
      >
        <TweetButton via={display} title={title} url={postUrl} />
      </div>
      <Footer author={author} />
    </div>
  )
}

export default Post

export const postQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        social {
          twitter {
            display
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
      }
    }
  }
`
