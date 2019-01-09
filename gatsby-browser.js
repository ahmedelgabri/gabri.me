/* global window */

import ReactGA from 'react-ga'
require('prism-themes/themes/prism-atom-dark.css')

ReactGA.initialize(
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'UA-10517764-7'
    : 'UA-10517764-2',
)

export const onRouteUpdate = state => {
  ReactGA.set({page: state.location.pathname})
  ReactGA.pageview(state.location.pathname)
}
