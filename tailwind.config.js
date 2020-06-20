const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx', './layouts/**/*.tsx'],
  theme: {
    extend: {
      screens: {
        light: {raw: '(prefers-color-scheme: light)'},
      },
      colors: {
        myBlue: {
          300: '#0074D9',
          400: '#0035f5',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
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
