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
      </body>
    </html>
  )
}
