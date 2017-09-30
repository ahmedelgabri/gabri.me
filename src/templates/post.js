// @flow
import React from 'react'
import { fonts } from '../utils/style'
import Meta from '../components/Meta'
import Back from '../components/Back'
import Footer from '../components/Footer'
import TweetButton from '../components/TweetButton'
import { css } from 'emotion'
import 'prism-themes/themes/prism-duotone-dark.css'

const Post = props => {
  const { title, date } = props.data.markdownRemark.frontmatter
  const {
    title: siteTitle,
    author,
    siteUrl,
    social: { twitter: { display } },
  } = props.data.site.siteMetadata
  const { html, excerpt } = props.data.markdownRemark
  const slug = props.data.markdownRemark.fields.slug
  const postUrl = siteUrl + slug
  return (
    <div css={`max-width: 45rem`}>
      <Meta
        title={`${title} | ${author} - ${siteTitle}`}
        excerpt={excerpt}
        url={postUrl}
        post
      />
      <div css={`border-bottom: 1px solid rgba(0, 0, 0, .1)`}>
        <Back />
        <h1>{title}</h1>
        <time
          css={`
          font-style: italic;
          font-size: .75rem;
          font-family: ${fonts.serif};
          display: block;
          margin-bottom: 2rem;
        `}
        >
          On {date}
        </time>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <div
        css={`
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
      id
      html
      excerpt(pruneLength: 160)
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
      }
    }
  }
`
