import * as React from 'react'
import {graphql} from 'gatsby'
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import Header from '../components/Header'
import PostList from '../components/PostList'
import Footer from '../components/Footer'

export const query = graphql`
  query blogIndexQuery {
    site {
      siteMetadata {
        author
        title
        siteUrl
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
    },
  } = props

  return (
    <Layout>
      <div>
        <Meta title={`${author} | ${title}`} url={siteUrl} />
        <Header />
        <div className="mb-4">
          <PostList />
        </div>
        <Footer author={author} />
      </div>
    </Layout>
  )
}
