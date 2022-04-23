import * as React from 'react'
import Script from 'next/script'
import {allPosts, type Post} from 'contentlayer/generated'
import {useMDXComponent} from 'next-contentlayer/hooks'
import Meta from '../../components/Meta'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import Footer from '../../components/Footer'
import TweetButton from '../../components/TweetButton'
import H from '../../components/Prose/H'
import meta from '../../config/meta'
import MdxComponents from '../../components/mdxComponents'

interface Props {
  post: Post
}

const {
	title: siteTitle,
	author,
	siteUrl,
	social: {
		twitter: {display},
	},
} = meta

export async function getStaticProps({params}) {
  return {
    props: {
      post: allPosts.find((p) => p.slug === params.slug),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: allPosts.map((post) => post.url),
    fallback: false,
  }
}

export default function Post(props: Props) {
  const {
    post: {date, excerpt, title, body, formattedDate, url},
  } = props

  const postUrl = `${siteUrl}${url}`
  const Component = useMDXComponent(body.code)

  return (
    <>
      <Meta
        title={`${title} | ${author} - ${siteTitle}`}
        excerpt={excerpt}
        url={postUrl}
        post
      />
      <Script
        strategy="lazyOnload"
        src="https://platform.twitter.com/widgets.js"
      />
      <Layout>
        <Header />
        <H level="2">{title}</H>
        <time
          className="mb-12 block font-mono text-sm italic text-gray-500"
          dateTime={date}
        >
          On {formattedDate}
        </time>
        <div className="prose dark:prose-light">
          <Component components={MdxComponents} />
        </div>
        <div>
          <TweetButton via={display} title={title} url={postUrl} />
        </div>
        <Footer />
      </Layout>
    </>
  )
}
