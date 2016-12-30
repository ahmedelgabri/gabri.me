import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Match, Redirect } from 'react-router'

import Home from './Home'
import Post from './components/Post'
import PostList from './components/PostList'

import '../public/css/app.css'


// const favicon = require('../public/favicon.png')

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern='/' component={Home} />
        {/* Maybe handle this on the server side
          <Match exactly pattern='/work' render={() => <Redirect to='/' />} />
          <Match pattern='/work/:project' render={() => <Redirect to='/' />} />
        */}
        <Match exactly pattern='/blog' component={PostList} />
        <Match pattern='/blog/:post' component={Post} />
      </div>
    </BrowserRouter>
  )
}

render(<App />, document.querySelector('#App'))
