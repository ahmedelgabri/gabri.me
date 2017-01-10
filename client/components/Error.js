import React, { PropTypes } from 'react'
import Link from 'react-router/Link'

export default props => (
  <div>
    <h2>{props.location.pathname} NOT FOUND</h2>
    <img src='https://media.giphy.com/media/uZvpSc5LVa3hS/giphy.gif' style={{maxWidth: '100%'}} />
    <p><Link to='/'>&lt;-- Go back home</Link></p>
  </div>
)
