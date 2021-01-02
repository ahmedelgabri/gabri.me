import * as React from 'react'
import Meta from '../../components/Meta'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import PostList from '../../components/PostList'
import Footer from '../../components/Footer'
import meta from '../../config/meta'
import {getAllPosts} from '../../lib/utils'

const {author, title, siteUrl} = meta

export async function getStaticProps() {
  const posts = await getAllPosts()

  return {
    props: {
      posts,
    },
  }
}

export default function BlogIndex({posts}: any) {
  return (
    <Layout>
      <div>
        <Meta title={`${author} | ${title}`} url={siteUrl} />
        <Header />
        <PostList posts={posts} />
        <Footer />
      </div>
    </Layout>
  )
}
