const path = require('path')

module.exports = {
  extends: [
    '@ahmedelgabri',
    '@ahmedelgabri/eslint-config/prettier',
    '@ahmedelgabri/eslint-config/import',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    babelOptions: {
      configFile: path.resolve(__dirname, './.babelrc.js'),
    },
  },
  globals: {
    graphql: true,
  },
}
