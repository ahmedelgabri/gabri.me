// @flow
import React from 'react'
import Helmet from 'react-helmet'
import { minify } from 'csso'
import config from '../gatsby-config'
import favicon from '../static/favicon.png'
import msTile from '../static/img/ms-logo.png'
import logo from '../static/img/logo.svg'
import appleIcon57 from '../static/apple-touch-icon-57x57-precomposed.png'
import appleIcon72 from '../static/apple-touch-icon-72x72-precomposed.png'
import appleIcon114 from '../static/apple-touch-icon-114x114-precomposed.png'
import { globalStyles } from './utils/style'

let stylesStr = ''
if (process.env.NODE_ENV === 'production') {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

const cssStr =
  process.env.NODE_ENV === `production`
    ? minify(stylesStr + globalStyles).css
    : globalStyles

export default function HTML(props) {
  const head = Helmet.rewind()
  const { description, social, twitter_id, siteUrl } = config.siteMetadata

  return (
    <html lang="en">
      <head>
        <meta chartset="utf-8" />
        <meta name="description" content={description} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: cssStr }}
        />
        <link rel="shortcut icon" href={favicon} />
        <link
          type="text/plain"
          rel="author"
          href="https://plus.google.com/101787568188227600845/"
        />
        <meta name="application-name" content="Gabri.me" />
        <link name="msapplication-TileImage" href={msTile} />
        <link name="msapplication-TileColor" content="#1f2325" />
        <meta name="theme-color" content="#1f2325" />

        <link
          rel="apple-touch-icon-precomposed"
          sizes="114x114"
          href={appleIcon114}
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="72x72"
          href={appleIcon72}
        />
        <link rel="apple-touch-icon-precomposed" href={appleIcon57} />
        <link rel="logo" type="image/svg" href={logo} />
        <meta name="apple-mobile-web-app-title" content="Gabri.me" />
        <link
          rel="author"
          href="https://plus.google.com/101787568188227600845/posts"
        />

        <meta property="twitter:account_id" content={twitter_id} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content={social.twitter.url} />
        <meta name="twitter:domain" content={siteUrl} />

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
