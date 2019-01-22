const {NODE_ENV, BABEL_ENV} = process.env
const PRODUCTION = (BABEL_ENV || NODE_ENV) === 'production'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: false,
        targets: [`last 2 versions`, `not ie <= 11`, `not android 4.4.3`],
        debug: false,
      },
    ],
    ['@babel/preset-react', {delevelopment: !PRODUCTION}],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
  ],
}
