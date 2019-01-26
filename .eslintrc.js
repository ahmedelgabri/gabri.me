const path = require('path')

module.exports = {
  extends: [
    '@ahmedelgabri',
    '@ahmedelgabri/eslint-config/prettier',
    '@ahmedelgabri/eslint-config/import',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  globals: {
    graphql: true,
  },
}
