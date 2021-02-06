import * as React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import {GA} from '../lib/gtag'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="text-xl">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="color-scheme" content="dark light" />
          <link rel="shortcut icon" href="favicon.png" />
          <GA />
        </Head>
        <body className="lg:border lg:border-my border-gray-400 dark:border-gray-800 text-gray-900 bg-gray-300 dark:text-gray-400 dark:bg-gray-900">
          <script
            dangerouslySetInnerHTML={{
              __html: `(function() {
  window.__onThemeChange = function() {};

  function setTheme(newTheme) {
    window.__theme = newTheme;
    preferredTheme = newTheme;
    document.documentElement.classList.remove(newTheme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.add(newTheme);
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
