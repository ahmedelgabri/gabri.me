const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const data = require('./data')
const isPROD = process.env.NODE_ENV === 'production'

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000
  },
  devtool: isPROD ? 'hidden-source-map' : 'eval-source-map',
  cache: !isPROD,
  bail: true,
  stats: {
    reasons: !isPROD
  },
  entry: {
    app: './client/index.js',
  },
  output: {
    path: path.resolve(__dirname, '__build__'),
    filename: isPROD ? 'js/[name]-[hash].js' : 'js/[name].js',
    chunkFilename: isPROD ? 'js/[name]-chunk-[hash].js' : 'js/[name]-chunk.js'
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        exclude: /node_modules/,
        use: 'file-loader',
        options: {
          name: isPROD ? '[name]-[sha512:hash:hex:20].[ext]' : '[name].[ext]',
          publicPath: 'public',
          outputPath: '__build__/public'
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: !isPROD,
      minimize: isPROD
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: !isPROD,
      compress: {
        warnings: !isPROD,
        drop_console: isPROD
      },
      comments: !isPROD,
      screw_ie8: isPROD
    }),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      title: data.site_title,
      template: './client/index.html',
      inject: true,
      minify: {
        removeComments: isPROD,
        collapseWhitespace: isPROD,
        collapseBooleanAttributes: true,
        useShortDoctype: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true
      },
      hash: isPROD
    })
  ]
}
