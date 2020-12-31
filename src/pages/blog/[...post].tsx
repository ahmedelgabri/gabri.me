import * as React from 'react'
import {useRouter} from 'next/router'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import Meta from '../../components/Meta'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import Footer from '../../components/Footer'
import TweetButton from '../../components/TweetButton'
import meta from '../../config/meta'
import {getPostBySlug, getAllPosts} from '../../lib/utils'
import MdxComponents from '../../components/mdx'

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
  const data = await getPostBySlug(params.post[0])

  const mdxContent = await renderToString(data.content, {
    components: MdxComponents,
  })

  return {
    props: {
      post: {
        ...(data || {}),
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
  const router = useRouter()
  const postUrl = `${siteUrl}${router.asPath}`

  const {
    post: {mdxContent, date, excerpt, title},
  } = props

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
        <h2 className="mb-4 text-6xl font-extrabold leading-none tracking-tight">
          {title}
        </h2>
        <div className="post lg:w-3/4">
          <time
            className="block mb-4 italic text-gray-500 text-sm"
            dateTime={date}
          >
            On {date}
          </time>
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
