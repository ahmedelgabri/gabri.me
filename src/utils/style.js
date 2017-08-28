// @flow

import chroma from 'chroma-js'

export const fonts = {
  monospace: 'Inconsolata, monospace',
  fontFamily: 'Inconsolata, monospace',
  serif: 'palatino, georgia, serif',
}

export const colors = {
  teal: 'rgba(96, 125, 139, 1)',
  grey: '#989898',
  black: '#171717',
  darkGrey: '#272727',
  darkteal: '#455A64',
  wheat: '#f2f2f2',
  orange: '#d84315',
  darkBlue: '#132331',
  blue: '#5ba0c2',
  logo: '#c0c5ca',
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
      font-size: 140%;
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
    line-height: 1.6;
    text-size-adjust: 100%;
    font-family: ${fonts.fontFamily};
    margin: 0;
    background-color: ${colors.darkGrey};
    color: ${colors.grey};
    font-feature-settings: "kern", "liga", "dlig", "hlig", "cswh";
    font-kerning: auto;
  }

  h1, h2, h3, h4, h5, h6, a {
    color: ${colors.blue};
  }

  h1 {
    font-size: 2rem;
    margin: 0 0 .5em;
    line-height: 1.2;
  }

  @media screen and (min-width: 27em) {
    h1 {
      font-size: 3rem;
    }
  }

  p {
    margin: 0 0 1em;
  }

  .twitter-tweet {
    margin: 0 0 1rem !important;
  }

  a {
    text-decoration: none;
    border-bottom: 2px solid ${chroma(colors.darkGrey).brighten()};
    transition: all .2s ease-in-out;
  }

  a:hover,
  a:focus {
    border-bottom-color: ${colors.orange};
  }

  :focus {
    outline: 2px solid ${colors.blue};
  }

  img { max-width: 100%; }
  ul, ol {
    padding: 0;
  }

  pre {
    overflow: auto;
    max-width: 100%;
    padding: 1rem;
    border-radius: 3px;
    background-color: ${colors.wheat};
    color: ${colors.darkGrey};
    border: 1px solid;
    font-family: ${fonts.fontFamily} !important;
    font-size: inherit !important;
    margin-bottom: 1.5rem !important;
  }

  code {
    font-family: ${fonts.fontFamily} !important;
    font-size: inherit !important;
  }

  :not(pre) > code {
    background-color: ${colors.black};
    color: ${colors.logo};
    padding: .1em .3em;
    border-radius: .2em;
  }

  blockquote {
    font-style: italic;
    font-family: ${fonts.serif};
    border: 1px solid;
    margin-left: 0;
    padding: 1em;
    background: ${colors.darkBlue};
    width: 100%;
  }

  blockquote > p {
    margin-bottom: 0;
  }
`
