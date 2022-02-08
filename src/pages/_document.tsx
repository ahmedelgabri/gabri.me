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
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
          <GA />
        </Head>
        <body className="bg-slate-200 p-4 text-slate-700 dark:bg-zinc-900 dark:text-slate-400 md:p-8">
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
