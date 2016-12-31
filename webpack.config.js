const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const data = require('./config')
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
    app: './client/App.js',
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
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.md$/, exclude: /node_modules/, loader: 'html-loader!markdown-loader' },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?importLoaders=1&-autoprefixer!postcss-loader?sourceMap-inline'
        })
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
    new ExtractTextPlugin(`css/${isPROD ? '[name]-[contenthash]' : '[name]'}.css`),
    new HtmlWebpackPlugin({
      title: `${data.author} | ${data.site_title}`,
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
  ]
}
