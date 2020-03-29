const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      screens: {
        dark: {raw: '(prefers-color-scheme: dark)'},
      },
      colors: {
        myBlue: {
          300: '#0074D9',
          400: '#0035f5',
        },
      },
      fontFamily: {
        mono: [
          '"PragmataPro Liga", "PragmataPro", "Iosevka", "Iosevka Term", "IBM Plex Mono", Inconsolata',
          ...defaultTheme.fontFamily.mono,
        ],
      },

      fontSize: {
        tiny: '.5rem',
        ...defaultTheme.fontSize,
      },
    },
  },
  variants: {},
  plugins: [require('glhd-tailwindcss-transitions')()],
}
