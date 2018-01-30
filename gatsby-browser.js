/* global window */
// @flow
import ReactGA from 'react-ga'
import config from './gatsby-config'

const tracker =
  typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'local' : 'prod'

ReactGA.initialize(config.siteMetadata.googleAnalytics[tracker])

exports.onRouteUpdate = state => {
  ReactGA.set({ page: state.location.pathname })
  ReactGA.pageview(state.location.pathname)
}
