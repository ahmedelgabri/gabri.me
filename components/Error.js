// @flow
import React from 'react'
import Back from './Back'

export default props => (
  <div>
    <h2>{props.location.pathname} NOT FOUND</h2>
    <img src='https://media.giphy.com/media/uZvpSc5LVa3hS/giphy.gif' style={{maxWidth: '100%'}} />
    <Back />
  </div>
)
