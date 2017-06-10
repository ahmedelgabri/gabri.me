// @flow
import Document, { Head, Main, NextScript } from 'next/document'
import cxs from 'cxs'
import data from '../data.json'
import { global } from '../lib/style'

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage()
    let style = cxs.getCss()
    return { ...page, style: `${global}${style}` }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="description" content={data.description} />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title={`${data.author} | Feed`}
            href={`${data.url}/feed/`}
          />
          <link rel="icon" href="/static/favicon.png" />
          <link
            type="text/plain"
            rel="author"
            href="https://plus.google.com/101787568188227600845/"
          />
          <meta name="application-name" content="Gabri.me" />
          <link name="msapplication-TileImage" href="/static/img/ms-logo.png" />
          <link name="msapplication-TileColor" content="#1f2325" />
          <meta name="theme-color" content="#1f2325" />

          <link
            rel="apple-touch-icon-precomposed"
            sizes="114x114"
            href="/static/apple-touch-icon-114x114-precomposed.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="72x72"
            href="/static/apple-touch-icon-72x72-precomposed.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            href="/static/apple-touch-icon-57x57-precomposed.png"
          />
          <link rel="logo" type="image/svg" href="/static/img/logo.svg" />
          <meta name="apple-mobile-web-app-title" content="Gabri.me" />
          <link
            rel="author"
            href="https://plus.google.com/101787568188227600845/posts"
          />

          <meta property="twitter:account_id" content={data.twitter_id} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content={data.twitter} />
          <meta name="twitter:domain" content={data.url} />

          <style dangerouslySetInnerHTML={{ __html: this.props.style }} />
        </Head>
        <body>
          <div>
            <Main />
            <NextScript />
          </div>
          <script src="https://www.google-analytics.com/analytics.js" async />
        </body>
      </html>
    )
  }
}
