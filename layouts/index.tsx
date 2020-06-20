import * as React from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import TweetButton from '../components/TweetButton'
import meta from '../config/meta'

interface Props {
  children: React.ReactNode
}

const {
  title: siteTitle,
  author,
  siteUrl,
  social: {
    twitter: {display},
  },
} = meta

export default function index(frontMatter) {
  const {title, date, published, tags, excerpt} = frontMatter

  return function Post(props: Props) {
    const {children} = props
    const router = useRouter()
    const postUrl = `${siteUrl}${router.asPath}`

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
            <div>{children}</div>
          </div>
          <div>
            <TweetButton via={display} title={title} url={postUrl} />
          </div>
          <Footer />
        </div>
      </Layout>
    )
  }
}
