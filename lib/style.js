export const fonts = {
  monospace: 'Fira Code, Input Mono, Input, Droid Sans Mono, monospace, monospace',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
}

export const colors = {
  teal: '#607D8B',
  darkteal: '#455A64',
  wheat: '#dfe5ec',
  orange: '#d84315',
  darkBlue: '#24333A'
}

export const global = `
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    font-size: 100%;
  }

  body {
    height: 100%;
    font-size: 1rem;
    line-height: 1.4;
    text-size-adjust: 100%;
    font-family: ${fonts.fontFamily};
    margin: 0;
    background-color: ${colors.wheat};
    color: ${colors.teal};
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
  ul { padding: 0; }
  ol { padding: 0; }

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
  }
  code { font-family: ${fonts.monospace}; }

  blockquote {
    font-style: italic;
    font-family: palatino, georgia, serif;
    border-left: 2px solid;
    margin-left: 0;
    padding: 0.1em 1em;
    background: rgba(255, 255, 255, 0.49);
    width: 100%;
  }
`
