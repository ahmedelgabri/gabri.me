import * as React from 'react'
import {useRouter} from 'next/router'
import Script from 'next/script'
import {MDXRemote} from 'next-mdx-remote'
import type {MDXRemoteSerializeResult} from 'next-mdx-remote'
import {serialize} from 'next-mdx-remote/serialize'
import mdxPrism from 'mdx-prism'
import Meta from '../../components/Meta'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import Footer from '../../components/Footer'
import TweetButton from '../../components/TweetButton'
import H from '../../components/Prose/H'
import meta from '../../config/meta'
import {getPostBySlug, getAllPosts} from '../../lib/utils'
import MdxComponents from '../../components/mdxComponents'

interface Props {
  post: {
    title: string
    date: string
    content: string
    mdxContent: MDXRemoteSerializeResult
    excerpt: string
  }
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
  const post = await getPostBySlug(params.slug)

  const mdxContent = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-slug'),
        require('remark-code-titles'),
      ],
      rehypePlugins: [mdxPrism],
    },
  })

  return {
    props: {
      post: {
        ...post,
        mdxContent,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts()

  return {
    paths: posts.map((post) => post.slug),
    fallback: false,
  }
}

export default function Post(props: Props) {
  const {
    post: {mdxContent, date, excerpt, title},
  } = props

  const router = useRouter()
  const postUrl = `${siteUrl}${router.asPath}`

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
          className="font-mono block mb-12 italic text-gray-500 text-sm"
          dateTime={date}
        >
          On {date}
        </time>
        <div className="prose dark:prose-light">
          <MDXRemote {...mdxContent} components={MdxComponents} lazy />
        </div>
        <div>
          <TweetButton via={display} title={title} url={postUrl} />
        </div>
        <Footer />
      </Layout>
    </>
  )
}
