import ReactGA from 'react-ga'

export const logEvent = (category = '', action = '') => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Logging event for ${category} & ${action}`)
  }

  if (category && action) {
    ReactGA.event({ category, action })
  }
}
