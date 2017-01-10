import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Match, Miss, Redirect } from 'react-router'

import Home from './Home'
import Post from './components/Post'
import PostList from './components/PostList'
import Error from './components/Error'

import '../public/css/app.css'

// const favicon = require('../public/favicon.png')

const App = () => {
  return (
    <BrowserRouter>
      <main className='P1'>
        <Match exactly pattern='/' component={Home} />
        <Match exactly pattern='/blog' component={PostList} />
        <Match exactly pattern='/blog/:post' component={Post} />
        <Match pattern='/work' render={() => <Redirect to='/' />} />
        <Miss component={Error} />
      </main>
    </BrowserRouter>
  )
}

render(<App />, document.querySelector('#App'))
