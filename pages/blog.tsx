import * as React from 'react'
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import Header from '../components/Header'
import PostList from '../components/PostList'
import Footer from '../components/Footer'
import meta from '../config/meta'
// @ts-ignore
// eslint-disable-next-line import/no-unresolved, import/extensions
import {frontMatter as blogPosts} from './blog/**/*.md'

const {author, title, siteUrl} = meta

export default function BlogIndex() {
  return (
    <Layout>
      <div>
        <Meta title={`${author} | ${title}`} url={siteUrl} />
        <Header />
        <div className="mb-4">
          <PostList posts={blogPosts} />
        </div>
        <Footer />
      </div>
    </Layout>
  )
}
