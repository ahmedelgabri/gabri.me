// @flow
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import Back from '../components/Back'
import Footer from '../components/Footer'
import gif from '../../public/img/404.gif'

const Error = props => (
  <Layout>
    <Helmet>
      <title>Oops - page not found 🙈</title>
    </Helmet>
    <Back />
    <h2>Sorry! 😰, this page was not found.</h2>
    <img src={gif} alt="" style={{maxWidth: '100%'}} />
    <Footer author={props.data.site.siteMetadata.author} />
  </Layout>
)

export default Error

export const pageQuery = graphql`
  query errorQuery {
    site {
      siteMetadata {
        author
      }
    }
  }
`
