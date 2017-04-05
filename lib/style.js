export const isNight = () => false
// export const isNight = () => +new Date(Date.now()).getHours() > 12

export const fonts = {
  monospace: 'Fira Code, Input Mono, Input, Droid Sans Mono, monospace, monospace',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  serif: 'palatino, georgia, serif',
}

export const colors = (night = isNight()) => ({
  teal(a = 1) { return night ? `rgba(128, 174, 197, ${a})` : `rgba(96, 125, 139, ${a})` },
  darkteal: '#455A64',
  wheat: night ? '#1b1c27' : '#dfe5ec',
  orange: '#d84315',
  darkBlue: '#24333A',
  logo: night ? 'rgba(255, 255, 255, .5)' : '#c0c5ca'
})

export const global = `
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

  body {
    height: 100%;
    font-size: 1rem;
    line-height: 1.6;
    text-size-adjust: 100%;
    font-family: ${fonts.fontFamily};
    margin: 0;
    background-color: ${colors().wheat};
    color: ${colors().teal()};
  }

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 2px solid ${isNight() ? 'rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, .1)'};
    transition: all .2s ease-in-out;
  }

  a:hover,
  a:focus {
    border-bottom-color: ${colors().orange};
  }

  :focus {
    outline: 2px solid ${colors().teal()};
  }

  img { max-width: 100%; }
  ul { padding: 0; }
  ol { padding: 0; }

  pre {
    overflow: auto;
    max-width: 100%;
    padding: 1rem;
    border-radius: 3px;
    background-color: ${colors().darkBlue};
    color: ${colors().wheat};
    border: 1px solid;
    font-family: ${fonts.monospace};
    font-size: .875rem;
  }

  code {
    font-family: ${fonts.monospace};
  }

  p > code {
    background-color: ${isNight() ? 'rgba(30, 161, 220, 0.11)' : 'rgba(3, 169, 244, 0.06)'};
    padding: .1em .3em;
    border-radius: .2em;
  }

  blockquote {
    font-style: italic;
    font-family: ${fonts.serif};
    border-left: 2px solid;
    margin-left: 0;
    padding: 0.1em 1em;
    background: ${isNight() ? 'black' : 'rgba(255, 255, 255, 0.49)'};
    box-shadow: 0px 0px 10px 0px ${colors().teal(.1)};
    width: 100%;
  }
`
