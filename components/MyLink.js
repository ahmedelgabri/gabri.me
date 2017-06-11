// @flow
import React, { Component } from 'react'

// This is the custom wrapper component you would build and use just like `next/link`:
// https://github.com/zeit/next.js/issues/1490#issuecomment-290724312

export default class MyLink extends Component {
  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(event)
    }

    if (this.props.onCustomClick) {
      this.props.onCustomClick(event)
    }
  }

  render() {
    const { onCustomClick, ...props } = this.props
    return <a {...props} onClick={this.handleClick} />
  }
}
