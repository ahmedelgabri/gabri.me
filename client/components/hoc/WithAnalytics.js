// @flow
import React, { Component } from 'react'

export default (Comp) => {
  return class WithAnalytics extends Component {
    componentDidMount () {
      console.log(this.props)
      if (window.ga) {
        window.ga('set', 'page', this.props.location.pathname)
        window.ga('send', 'pageview')
      }
    }

    render () {
      return (
        <Comp {...this.props}/>
      )
    }
  }
}
