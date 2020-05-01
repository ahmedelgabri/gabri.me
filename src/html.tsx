import * as React from 'react'
import favicon from '../static/favicon.png'

export default class HTML extends React.Component<
  {
    htmlAttributes: {}
    headComponents: React.ReactNode
    bodyAttributes: {}
    body: string
    postBodyComponents: React.ReactNode
    preBodyComponents: React.ReactNode
  },
  {}
> {
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
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href={favicon} />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function() {
  window.__onThemeChange = function() {};

  function setTheme(newTheme) {
    window.__theme = newTheme;
    preferredTheme = newTheme;
    document.documentElement.className = newTheme;
    window.__onThemeChange(newTheme);
  }

  var preferredTheme;
  try {
    preferredTheme = localStorage.getItem('theme');
  } catch (err) { }

  window.__setPreferredTheme = function(newTheme) {
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (err) {}
  }

  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  darkQuery.addListener(function(e) {
    window.__setPreferredTheme(e.matches ? 'dark' : 'light')
  });

  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));

})();`,
            }}
          />
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
