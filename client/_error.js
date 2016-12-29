import React from 'react'

export default class Error extends React.Component {
  static getInitialProps ({ res, xhr }) {
    const errorCode = res ? res.statusCode : xhr.status
    return { errorCode }
  }

  render () {
    return (
      <div>
        <h2>ERROR {this.props.errorCode} - PAGE NOT FOUND</h2>
        <img src="https://media.giphy.com/media/uZvpSc5LVa3hS/giphy.gif" style={{maxWidth: '100%'}}/>
        <p><a href="/">&lt;-- Go back home</a></p>
      </div>
    )
  }
}
