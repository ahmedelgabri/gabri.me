// @flow
export const fonts = {
  monospace: 'monospace, monospace',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  serif: 'palatino, georgia, serif',
}

export const colors = {
  teal: 'rgba(96, 125, 139, 1)',
  darkteal: '#455A64',
  wheat: '#f2f2f2',
  orange: '#d84315',
  darkBlue: '#24333A',
  blue: '#297ca5',
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
    background-color: ${colors.wheat};
    color: ${colors.teal};
    font-feature-settings: "kern", "liga", "dlig", "hlig", "cswh";
    font-kerning: auto;
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

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 2px solid rgba(0, 0, 0, .1);
    transition: all .2s ease-in-out;
  }

  a:hover,
  a:focus {
    border-bottom-color: ${colors.orange};
  }

  :focus {
    outline: 2px solid ${colors.teal};
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
    background-color: ${colors.darkBlue};
    color: ${colors.wheat};
    border: 1px solid;
    font-family: ${fonts.monospace};
    font-size: .875rem;
    margin-bottom: 1.5rem !important;
  }

  code {
    font-family: ${fonts.monospace};
  }

  p > code {
    background-color: rgba(3, 169, 244, 0.06);
    padding: .1em .3em;
    border-radius: .2em;
  }

  blockquote {
    font-style: italic;
    font-family: ${fonts.serif};
    border: 1px solid;
    margin-left: 0;
    padding: 1em;
    background: white;
    width: 100%;
  }

  blockquote > p {
    margin-bottom: 0;
  }
`
