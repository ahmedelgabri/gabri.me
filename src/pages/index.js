// @flow
import React from 'react'
import cxs from 'cxs'
import Meta from '../components/Meta'
import Logo from '../components/Logo'
import PostList from '../components/PostList'
import Talks from '../components/Talks'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const s = {
  logo: cxs({
    width: 50,
    display: 'inline-block',
    opacity: 0.3,
    transition: 'all .2s linear',
    ':hover': { opacity: 1 },
  }),
  split: cxs({
    '@media screen and (min-width: 48em)': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
}

export default props => {
  const { author, social, talks, title, siteUrl } = props.data.site.siteMetadata
  const posts = props.data.allMarkdownRemark.edges
  return (
    <div>
      <Meta author={author} url={siteUrl} siteTitle={title} />
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
        in Amsterdam, The Netherlands.
      </p>
      <Contact social={social} />
      <div className={s.split}>
        <div>
          <PostList posts={posts} />
        </div>
        <div>
          <Talks talks={talks} />
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
