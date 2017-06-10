import React, { Component } from 'react'
import posts from '../posts/articles/metadata.json'
import newsletter from '../posts/weekly-links/metadata.json'
import Wrap from '../components/layout/Wrap'
import Post from '../components/Post'

export default class Blog extends Component {
  static async getInitialProps({ res, query: { post } }) {
    if (!post) {
      res.statusCode = 301
      res.redirect('/')
      return
    }

    return {
      post: posts[post] || newsletter[post],
      slug: post,
    }
  }

  render() {
    return <Wrap><Post post={this.props.post} slug={this.props.slug} /></Wrap>
  }
}
