const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  purge: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
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
}
