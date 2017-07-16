// @flow
import React from 'react'
import cxs from 'cxs'
import format from 'date-fns/format'
import { fonts } from '../utils/style'
import Meta from '../components/Meta'
import Back from '../components/Back'
import Footer from '../components/Footer'
import TweetButton from '../components/TweetButton'
import 'prism-themes/themes/prism-duotone-dark.css'

const s = {
  meta: cxs({
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontSize: '.75rem',
    display: 'block',
    marginBottom: '2rem',
  }),
  post: cxs({
    borderBottom: '1px solid rgba(0, 0, 0, .1)',
  }),
  contact: cxs({
    marginBottom: '1rem',
    paddingBottom: '1rem',
    paddingTop: '1rem',
  }),
}

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
        <time className={s.meta}>
          On {format(date, 'Do MMMM YYYY')}
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
        date
      }
    }
  }
`
