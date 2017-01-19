const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const data = require('./client/data')
const isPROD = process.env.NODE_ENV === 'production'

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9000
  },
  devtool: isPROD ? 'hidden-source-map' : 'eval-source-map',
  cache: !isPROD,
  bail: true,
  stats: {
    reasons: !isPROD
  },
  entry: [
    !isPROD && 'webpack/hot/dev-server',
    !isPROD && 'webpack-hot-middleware/client',
    './client/index.js'
  ].filter(Boolean),
  output: {
    path: path.resolve(__dirname, '__build__'),
    publicPath: '/',
    filename: isPROD ? 'js/[name]-[hash].js' : 'js/[name].js',
    chunkFilename: isPROD ? 'js/[name]-chunk-[hash].js' : 'js/[name]-chunk.js'
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: isPROD ? '[name]-[sha512:hash:hex:20].[ext]' : '[name].[ext]',
          publicPath: 'public',
          outputPath: '__build__/public'
        }
      }
    ]
  },
  plugins: [
    !isPROD && new webpack.HotModuleReplacementPlugin(),
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
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      data,
      environment: process.env.NODE_ENV,
      template: './client/index.html',
      inject: true,
      minify: {
        removeComments: isPROD,
        collapseWhitespace: isPROD,
        collapseBooleanAttributes: true,
        useShortDoctype: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true
      }
    })
  ].filter(Boolean)
}
