// @flow

import colors from 'colors.css'

export const fonts = {
  monospace: 'Inconsolata, monospace, monospace',
  sansSerif:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  serif: 'georgia, serif',
}

export const globalStyles = `
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    font-size: 100%;
  }

  @media screen and (min-width: 25em) {
    html {
      font-size: 120%;
    }
  }

  @media screen and (min-width: 120em) {
    html {
      font-size: 190%;
    }
  }

  body {
    height: 100%;
    font-size: 1rem;
    line-height: 1.5;
    text-size-adjust: 100%;
    font-family: ${fonts.monospace};
    margin: 0;
    background-color: ${colors.black};
    color: ${colors.silver};
    font-feature-settings: "kern", "liga", "dlig", "hlig", "cswh";
    font-kerning: auto;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${fonts.sansSerif};
    font-weight: 600;
    line-height: 1.1;
    margin: 0 0 1em;
  }

  h1 {
    font-size: 2rem;
  }

  @media screen and (min-width: 27em) {
    h1 {
      font-size: 3rem;
    }
  }

  p {
    margin: 0 0 1.5em;
  }

  .twitter-tweet {
    margin: 0 0 1rem !important;
  }

  a {
    color: ${colors.aqua};
    transition: all .2s ease-in-out;
    text-decoration-color: transparent;
  }

  a:hover,
  a:focus {
    text-decoration-color: ${colors.orange}
  }

  :focus {
    outline: 2px solid ${colors.blue};
  }

  img { max-width: 100%; }
  ul, ol {
    padding: 0;
    list-style: square;
  }

  pre {
    overflow: auto;
    max-width: 100%;
    padding: 1rem;
    background-color: ${colors.white};
    color: ${colors.gray};
    font-family: ${fonts.monospace} !important;
    border-radius: 0 !important;
    font-size: inherit !important;
    margin-bottom: 1.5rem !important;
  }

  pre code {
    color: inherit;
  }

  code {
    font-family: ${fonts.monospace} !important;
    font-size: inherit !important;
    color: ${colors.gray};
  }

  blockquote {
    font-style: italic;
    color: ${colors.olive};
    border-left: .75em solid;
    margin-left: 0;
    padding-left: 1em;
    width: 100%;
  }

  blockquote > p {
    margin-bottom: 0;
  }

  ::selection {
    background-color: ${colors.yellow};
    color: ${colors.black};
  }
`
