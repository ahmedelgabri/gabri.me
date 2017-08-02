// @flow
import React from 'react'
import { fonts } from '../utils/style'
import Meta from '../components/Meta'
import Back from '../components/Back'
import Footer from '../components/Footer'
import TweetButton from '../components/TweetButton'
import s from './post.module.css'
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
    <div>
      <Meta
        title={`${title} | ${author} - ${siteTitle}`}
        excerpt={excerpt}
        url={postUrl}
        post
      />
      <div className={s.post}>
        <Back />
        <h1>
          {title}
        </h1>
        <time className={s.meta} style={{ fontFamily: fonts.serif }}>
          On {date}
        </time>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <div className={s.contact}>
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
