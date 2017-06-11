/* global window */
// @flow
import ReactGA from 'react-ga'
import data from '../data.json'

const tracker = typeof window !== 'undefined' &&
  window.location.hostname === 'localhost'
  ? 'local'
  : 'prod'

export const initGA = () => {
  // console.log('GA init')
  ReactGA.initialize(data.google_analytics[tracker])
}

export const logPageView = () => {
  // console.log(`Logging pageview for ${window.location.pathname}`)
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
  // console.log(`Logging event for ${category} & ${action}`)
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  // console.log(`Logging exception for ${description} & is it fatal? ${fatal}`)
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
