const webpack = require('webpack')
const ServeWebpackPlugin = require('serve-webpack-plugin')
const MessageWebpackPlugin = require('../lib')

process.env.NODE_ENV = 'development'

webpack({
  entry: './example/entry.js',
  mode: 'development',
  plugins: [new ServeWebpackPlugin(), new MessageWebpackPlugin()],
  stats: 'none'
}).watch({}, () => {})
