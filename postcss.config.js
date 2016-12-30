module.exports = {
  plugins: [
    require('postcss-smart-import')(),
    require('postcss-custom-properties')(),
    require('autoprefixer')(),
    require('cssnano')()
  ]
}
