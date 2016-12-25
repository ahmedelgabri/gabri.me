import React, { Component } from 'react'
import { style } from 'next/css'
import Link from 'next/link'
import data from '../../harp'
import Footer from '../../components/Footer'

const BlogIndex = (props) => {
  return (
    <div>
      Hi, I'm the blog!
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <Link href='/blog?post=haha' as="/blog/haha">POST?!</Link>
      <Footer social={data.globals.social} />
    </div>
  )
}

const BlogPost = props => {
  return (
    <div className={style(styles.red)}>
      <h1>
        {props.post}!
      </h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Footer social={data.globals.social} />
    </div>
  )
}

export default class Blog extends Component {
  static getInitialProps ({ query: { post } }) {
    return { post }
  }

  render () {
    const f = this.props.post ? <BlogPost post={this.props.post} /> : <BlogIndex />
    return <div>{f}</div>
  }
}

const styles = {
  red: {
    color: 'red'
  }
}

