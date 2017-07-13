// @flow
import React from 'react'
import cxs from 'cxs'
import format from 'date-fns/format'
import { fonts } from '../utils/style'
// import Meta from '../components/Meta'
import Back from '../components/Back'
import Footer from '../components/Footer'
import TweetButton from '../components/TweetButton'

// import 'highlight.js/styles/gruvbox-dark.css'

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
  const html = props.data.markdownRemark.html
  const slug = props.data.markdownRemark.fields.slug
  return (
    <div>
      {/*
      <Meta post={post} pathname={slug}>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/gruvbox-dark.min.css"
        />
      </Meta>
      */}
      <div className={s.post}>
        <Back />
        <h1 className={s.title}>
          {title}
        </h1>
        <time className={s.meta}>
          On {format(date, 'Do MMMM YYYY')}
        </time>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <div className={s.contact}>
        <TweetButton title={title} slug={slug} />
      </div>
      <Footer />
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
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
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
