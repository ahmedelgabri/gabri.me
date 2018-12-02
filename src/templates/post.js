// @flow
import * as React from 'react'
import colors from 'colors.css'
import {graphql} from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import {MDXProvider} from '@mdx-js/tag'
import {css} from 'emotion'
import Meta from '../components/Meta'
import Back from '../components/Back'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import TweetButton from '../components/TweetButton'
import 'prism-themes/themes/prism-atom-dark.css'

export default function Post(props) {
  const {children, data, ...rest} = props
  const {title, date} = data.mdx.frontmatter
  const {
    title: siteTitle,
    author,
    siteUrl,
    social: {
      twitter: {display},
    },
  } = data.site.siteMetadata
  const {excerpt} = data.mdx
  const postUrl = `${siteUrl}${props.location.pathname}`

  return (
    <Layout>
      <MDXProvider components={{}}>
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
              datatime={date}
            >
              On {date}
            </time>
            <h1>{title}</h1>
            <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
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
      </MDXProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
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
    mdx(id: {eq: $id}) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
      }
      code {
        body
      }
    }
  }
`
