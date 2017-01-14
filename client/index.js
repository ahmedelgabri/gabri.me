import React from 'react'
import { render } from 'react-dom'
import App from './App'

render(<App />, document.querySelector('#App'))

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(<NextApp />, document.querySelector('#App'))
  });
}
