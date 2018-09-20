// @flow
import React from 'react'
import colors from 'colors.css'
import {graphql} from 'gatsby'
import {css} from 'emotion'
import Meta from '../components/Meta'
import Back from '../components/Back'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import TweetButton from '../components/TweetButton'
import 'prism-themes/themes/prism-atom-dark.css'

export default function Post(props) {
  const {title, date} = props.data.markdownRemark.frontmatter
  const {
    title: siteTitle,
    author,
    siteUrl,
    social: {
      twitter: {display},
    },
  } = props.data.site.siteMetadata
  const {html, excerpt} = props.data.markdownRemark
  const postUrl = `${siteUrl}${props.location.pathname}`

  return (
    <Layout>
      <div css={{maxWidth: '45rem'}}>
        <Meta
          title={`${title} | ${author} - ${siteTitle}`}
          excerpt={excerpt}
          url={postUrl}
          post
        />
        <div css={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>
          <Back />
          <time
            css={{
              fontStyle: 'italic',
              fontSize: '0.75rem',
              color: colors.gray,
              display: 'block',
            }}
          >
            On {date}
          </time>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{__html: html}} />
        </div>
        <div
          css={{
            marginBottom: '1rem',
            paddingBottom: '1rem',
            paddingTop: '1rem',
          }}
        >
          <TweetButton via={display} title={title} url={postUrl} />
        </div>
        <Footer author={author} />
      </div>
    </Layout>
  )
}

export const postQuery = graphql`
  query($slug: String!) {
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
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
      }
    }
  }
`
