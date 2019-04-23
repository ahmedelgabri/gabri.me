const path = require('path')

module.exports = {
  extends: [
    '@ahmedelgabri',
    '@ahmedelgabri/eslint-config/prettier',
    '@ahmedelgabri/eslint-config/import',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', '@typescript-eslint'],
  globals: {
    graphql: true,
  },
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
  },
  rules: {
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
  },
}
