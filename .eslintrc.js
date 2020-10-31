const path = require('path')

module.exports = {
  extends: ['@ahmedelgabri/eslint-config/full'],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
  },
  rules: {
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
  },
}
