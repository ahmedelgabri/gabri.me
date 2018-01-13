// @flow
import * as React from 'react'
import Helmet from 'react-helmet'
import favicon from '../static/favicon.png'

let stylesStr = ''
if (process.env.NODE_ENV === 'production') {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

export default function HTML(props) {
  const head = Helmet.rewind()

  return (
    <html lang="en">
      <head>
        <meta chartset="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{ __html: stylesStr }} />
        <link rel="shortcut icon" href={favicon} />
        {props.headComponents}
      </head>
      <body>
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Get rid of the annoying service worker
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                window.navigator.serviceWorker
                  .getRegistrations()
                  .then(function(registrations) {
                    var sws = registrations.filter(function(r) {
                      r.scope.includes(window.location.origin) &&
                        r.active &&
                        r.active.state &&
                        r.active.state === 'activated'
                    })

                    sws.forEach(function(r) {
                      r.active.state && r.active.state !== 'redundant' ? r.unregister() : null
                    })

                    return sws
                  })
                  .then(function(sws) {
                    sws.length && window.location.reload()
                  })
                  .catch(err => window.console && console.log('I\'m very sorry! can you try to refresh the page, unregistering a service worker is annoying!'))
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
