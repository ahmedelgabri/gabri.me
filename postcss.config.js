module.exports = {
  plugins: [
    require('postcss-smart-import')(),
    require('postcss-custom-properties')(),
    require('autoprefixer')({ browsers: 'last 2 versions, > 5%, ios_saf >= 9, android >= 5, ie >= 9' }),
    require('cssnano')({
      mergeRules: false,
      mergeLonghand: false,
      discardUnused: false,
      zindex: false,
      mergeIdents: false,
      reduceIdents: true,
      autoprefixer: false,
      convertValues: {
        convertLength: false
      },
      calc: {
        precision: 3
      },
      discardComments: {
        removeAll: true
      }
    })
  ]
}
