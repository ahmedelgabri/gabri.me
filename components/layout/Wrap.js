/* global window */
// @flow
import React, { Component } from 'react'
import cxs from 'cxs'
import { initGA, logPageView } from '../../lib/analytics'

const s = cxs({
  maxWidth: '60rem',
  padding: '6%',
})

export default class Wrap extends Component {
  componentWillMount() {
    if (typeof window !== 'undefined') {
      if (!window.GA_INITIALIZED) {
        initGA()
        window.GA_INITIALIZED = true
      }
      logPageView()
    }
  }

  render() {
    return <div className={s}>{this.props.children}</div>
  }
}
