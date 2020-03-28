import * as React from 'react'
import {graphql} from 'gatsby'
import Meta from '../../components/Meta'
import Layout from '../../components/Layout'
import Back from '../../components/Back'
import PostList from '../../components/PostList'
import Footer from '../../components/Footer'

export const query = graphql`
  query blogIndexQuery {
    site {
      siteMetadata {
        author
        title
        siteUrl
      }
    }
    allMdx(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {fileAbsolutePath: {regex: "/blog/"}}
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

export default function Index(props: any) {
  const {
    data: {
      site: {
        siteMetadata: {author, title, siteUrl},
      },
      allMdx: {edges: posts},
    },
  } = props

  return (
    <Layout>
      <div>
        <Meta title={`${author} | ${title}`} url={siteUrl} />
        <Back />
        <div className="mb-4">
          <PostList posts={posts} />
        </div>
        <Footer author={author} />
      </div>
    </Layout>
  )
}
