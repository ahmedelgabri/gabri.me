/* global ga */
import data from '../data.json'

export default () => {
  if (typeof window !== 'undefined') {
    const tracker = window.location.hostname === 'localhost' ? 'local' : 'prod'

    // eslint-disable-next-line
    window.ga =
      window.ga ||
      function() {
        ;(ga.q = ga.q || []).push(arguments)
      }
    ga.l = +new Date()

    // ga comes from google-analytics script injected below
    ga('create', `${data.google_analytics[tracker]}`, 'auto', `${tracker}`)

    // autotrack
    // https://github.com/googleanalytics/autotrack
    // https://philipwalton.com/articles/the-google-analytics-setup-i-use-on-every-site-i-build/
    require('autotrack/lib/plugins/url-change-tracker')
    require('autotrack/lib/plugins/clean-url-tracker')
    require('autotrack/lib/plugins/outbound-form-tracker')
    require('autotrack/lib/plugins/outbound-link-tracker')
    require('autotrack/lib/plugins/event-tracker')
    require('autotrack/lib/plugins/page-visibility-tracker')

    ga('require', 'urlChangeTracker')
    ga('require', 'cleanUrlTracker')
    ga('require', 'outboundFormTracker')
    ga('require', 'outboundLinkTracker')
    ga('require', 'eventTracker', {
      attributePrefix: 'data-ga-',
    })
    ga('require', 'pageVisibilityTracker')

    // now that everything is ready, log initial page
    ga(`${tracker}.send`, 'pageview')
  }
}
