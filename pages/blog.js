import React, { Component } from 'react'
import metadata from '../posts/articles/metadata.json'
import Post from '../components/Post'

export default class Blog extends Component {
  static async getInitialProps ({ res, query: { post } }) {
    // if no post redirect to 404
    if (!metadata[post]) {
      res.statusCode = 404
      res.redirect('/404')
      return
    }

    return {
      post: metadata[post],
      slug: post,
    }
  }

  render () {
    return <Post post={this.props.post} slug={this.props.slug} />
  }
}
