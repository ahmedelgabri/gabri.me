// @flow
import React from 'react'
import Head from 'next/head'
import Back from '../components/Back'
import Wrap from '../components/layout/Wrap'

export default class Error extends React.Component {
  static async getInitialProps({ res, xhr }) {
    const errorCode = res ? res.statusCode : xhr.status
    return { errorCode }
  }

  render() {
    return (
      <Wrap>
        <Head>
          <title>Oops - page not found 🙈</title>
        </Head>
        <Back />
        <h2>ERROR {this.props.errorCode} - PAGE NOT FOUND</h2>
        <img src="/static/img/404.gif" alt="" style={{ maxWidth: '100%' }} />
      </Wrap>
    )
  }
}
