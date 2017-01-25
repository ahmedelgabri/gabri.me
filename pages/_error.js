// @flow
import React from 'react'
import Back from '../components/Back'

export default class Error extends React.Component {
  static async getInitialProps ({ res, xhr }) {
    const errorCode = res ? res.statusCode : xhr.status
    return { errorCode }
  }

  render () {
    return (
      <div>
        <h2>ERROR {this.props.errorCode} - PAGE NOT FOUND</h2>
        <img src="https://media.giphy.com/media/uZvpSc5LVa3hS/giphy.gif" style={{maxWidth: '100%'}} />
        <Back />
      </div>
    )
  }
}
