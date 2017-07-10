// @flow
import React from 'react'
// import Head from 'next/head'
import Back from '../components/Back'
// import Wrap from '../components/layout/Wrap'

const Error = () =>
  <Wrap>
    <Head>
      <title>Oops - page not found 🙈</title>
    </Head>
    <Back />
    <h2>
      ERROR {this.props.errorCode} - PAGE NOT FOUND
    </h2>
    <img src="/static/img/404.gif" alt="" style={{ maxWidth: '100%' }} />
  </Wrap>

export default Error
// export default class Error extends React.Component {
//   render() {
//     return (
//       <Wrap>
//         <Head>
//           <title>Oops - page not found 🙈</title>
//         </Head>
//         <Back />
//         <h2>ERROR {this.props.errorCode} - PAGE NOT FOUND</h2>
//         <img src="/static/img/404.gif" alt="" style={{ maxWidth: '100%' }} />
//       </Wrap>
//     )
//   }
// }
