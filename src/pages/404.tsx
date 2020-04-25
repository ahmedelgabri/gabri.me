import * as React from 'react'
import {Helmet} from 'react-helmet'
import {useStaticQuery, graphql} from 'gatsby'
import Layout from '../components/Layout'
import Back from '../components/Back'
import Footer from '../components/Footer'
import gif from '../../static/img/404.gif'

export default function Error() {
  const {
    site: {
      siteMetadata: {author},
    },
  } = useStaticQuery(graphql`
    query errorQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  return (
    <Layout>
      <Helmet>
        <title>Oops - page not found 🙈</title>
      </Helmet>
      <Back />
      <h2>Sorry! 😰, this page was not found.</h2>
      <img src={gif} alt="" style={{maxWidth: '100%'}} />
      <Footer author={author} />
    </Layout>
  )
}
