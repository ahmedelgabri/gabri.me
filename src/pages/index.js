// @flow
import React from 'react'
import cn from 'classnames'
import Meta from '../components/Meta'
import Logo from '../components/Logo'
import PostList from '../components/PostList'
import Talks from '../components/Talks'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import s from './index.module.css'

export default props => {
  const { author, social, talks, title, siteUrl } = props.data.site.siteMetadata
  const posts = props.data.allMarkdownRemark.edges
  return (
    <div>
      <div className={s.intro}>
        <Meta title={`${author} | ${title}`} url={siteUrl} />
        <Logo className={s.logo} />
        <h1>
          {author}
        </h1>
        <p>
          Front-end engineer,
          <br />
          Lead Front-end Developer at {' '}
          <a href="http://lightspeedhq.com">Lightspeed</a>
          <br />
          Based in Amsterdam, The Netherlands.
        </p>
        <Contact social={social} />
      </div>
      <div className={s.split}>
        <div className={cn(s.section, s.column)}>
          <Talks talks={talks} />
        </div>
        <div className={cn(s.section, s.column)}>
          <PostList posts={posts} />
        </div>
      </div>
      <Footer author={author} />
    </div>
  )
}

export const pageQuery = graphql`
  query indexQuery {
    site {
      siteMetadata {
        author
        title
        siteUrl
        description
        social {
          twitter {
            display
            url
          }
          github {
            display
            url
          }
          email {
            display
            url
          }
          resume {
            display
            url
          }
        }
        talks {
          AmsterdamJS
        }
        twitter_id
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/articles/" } }
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
