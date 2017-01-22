// @flow
import React, { Component } from 'react'

export default class Analytics extends Component {
  componentDidMount() {
    this.context.history.listen(state => {
      console.log(`I'm now on ${state.pathname}`)
      if (window.ga) {
        window.ga('set', 'page', state.pathname)
        window.ga('send', 'pageview')
      }
    })
  }

  render() {
    return null
  }
}


Analytics.contextTypes = {
  history: React.PropTypes.object
};


