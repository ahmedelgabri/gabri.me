import * as React from 'react'
import {graphql} from 'gatsby'
import {MDXRenderer} from 'gatsby-plugin-mdx'
import {MDXProvider} from '@mdx-js/react'
import MdxComponents from '../components/mdx'
import Meta from '../components/Meta'
import Back from '../components/Back'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import TweetButton from '../components/TweetButton'

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string
        author: string
        siteUrl: string
        social: {
          twitter: {display: string}
        }
      }
    }
    mdx: {
      id: number
      excerpt: string
      frontmatter: {
        title: string
        date: string
      }
      body: string
    }
  }
  location: {
    pathname: string
  }
  children: React.ReactNode
}

export default function Post(props: Props) {
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
  const postUrl = `${siteUrl}${rest.location.pathname}`

  return (
    <MDXProvider components={MdxComponents}>
      <Layout>
        <Meta
          title={`${title} | ${author} - ${siteTitle}`}
          excerpt={excerpt}
          url={postUrl}
          post
        />
        <div>
          <Back />
          <h1 className="mb-4 text-6xl font-extrabold leading-none tracking-tight">
            {title}
          </h1>
          <div className="lg:w-3/4">
            <time
              className="block mb-4 italic text-gray-500 text-tiny"
              dataTime={date}
            >
              On {date}
            </time>
            <div className="prose">
              <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </div>
          </div>
          <div>
            <TweetButton via={display} title={title} url={postUrl} />
          </div>
          <Footer author={author} />
        </div>
      </Layout>
    </MDXProvider>
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
      body
    }
  }
`
