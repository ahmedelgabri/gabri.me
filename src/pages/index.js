// @flow
import React from 'react'
import cxs from 'cxs'
// import Meta from '../components/Meta'
import Logo from '../components/Logo'
import PostList from '../components/PostList'
import Talks from '../components/Talks'
import Contact from '../components/Contact'

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
  const { author, social } = props.data.site.siteMetadata
  return (
    <div>
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
          <PostList />
        </div>
        <div>
          <Talks />
        </div>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query indexQuery {
    site {
      siteMetadata {
        author
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
        twitter_id
        url
      }
    }
  }
`