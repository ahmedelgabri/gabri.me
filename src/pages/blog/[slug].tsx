import * as React from 'react'
import {useRouter} from 'next/router'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
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
    mdxContent: string
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

  const mdxContent = await renderToString(post.content, {
    components: MdxComponents,
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
  const content = hydrate(mdxContent, {components: MdxComponents})

  React.useEffect(() => {
    const s = document.createElement('script')
    s.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    s.setAttribute('async', 'true')
    document.head.appendChild(s)
  }, [])

  return (
    <Layout>
      <Meta
        title={`${title} | ${author} - ${siteTitle}`}
        excerpt={excerpt}
        url={postUrl}
        post
      />
      <div>
        <Header />
        <div className="mb-12">
          <H level="2">{title}</H>

          <time
            className="block mb-4 italic text-gray-500 text-sm"
            dateTime={date}
          >
            On {date}
          </time>
        </div>
        <div className="prose dark:prose-light">
          <div>{content}</div>
        </div>
        <div>
          <TweetButton via={display} title={title} url={postUrl} />
        </div>
        <Footer />
      </div>
    </Layout>
  )
}
