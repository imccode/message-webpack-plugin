const webpack = require('webpack')
const ServeWebpackPlugin = require('serve-webpack-plugin')
const MessageWebpackPlugin = require('../lib')

webpack({
  entry: './example/entry.js',
  mode: 'development',
  plugins: [new ServeWebpackPlugin(), new MessageWebpackPlugin()]
}).watch({}, () => {})
