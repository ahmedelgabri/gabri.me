module.exports = {
  extends: [
    '@ahmedelgabri',
    '@ahmedelgabri/eslint-config/prettier',
    '@ahmedelgabri/eslint-config/flow',
    '@ahmedelgabri/eslint-config/import',
  ],
  parser: 'babel-eslint',
  plugins: ['react-hooks'],
  globals: {
    graphql: true,
  },
}
