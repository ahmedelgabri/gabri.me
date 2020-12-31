import * as React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import {GA} from '../lib/gtag'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <link rel="shortcut icon" href="favicon.png" />
          <GA />
        </Head>
        <body className="text-black bg-white dark:text-white dark:bg-black">
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
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
