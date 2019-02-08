// @flow
import * as React from 'react'
import {Global, css} from '@emotion/core'
import {globalStyles} from './utils/style'
import favicon from '../static/favicon.png'

type Props = PropsT<{
  htmlAttributes: {},
  headComponents: React.ReactNode,
  bodyAttributes: {},
  body: string,
  postBodyComponents: React.ReactNode,
  preBodyComponents: React.ReactNode,
}>

export default class HTML extends React.Component<Props, void> {
  render() {
    return (
      <html lang="en" {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="shortcut icon" href={favicon} />
          <Global
            styles={css`
              ${globalStyles}
            `}
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{__html: this.props.body}}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
