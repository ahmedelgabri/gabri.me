const path = require('path')

module.exports = {
  extends: [
    '@ahmedelgabri',
    '@ahmedelgabri/eslint-config/prettier',
    '@ahmedelgabri/eslint-config/import',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['plugin:@typescript-eslint/recommended'],
  globals: {
    graphql: true,
  },
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
  },
}
