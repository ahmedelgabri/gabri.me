import React, { Component } from 'react'
import posts from '../posts/articles/metadata.json'
import newsletter from '../posts/weekly-links/metadata.json'
import Post from '../components/Post'

export default class Blog extends Component {
  static async getInitialProps ({ res, query: { post } }) {

    // if /blog
    if (!post) {
      res.statusCode = 301
      res.redirect('/')
      return
    }

    return {
      post: posts[post] || newsletter[post],
      slug: post
    }
  }

  render () {
    return <Post post={this.props.post} slug={this.props.slug} />
  }
}
