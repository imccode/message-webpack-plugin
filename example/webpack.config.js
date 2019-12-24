const ServeWebpackPlugin = require('serve-webpack-plugin')
const MessageWebpackPlugin = require('../lib')

module.exports = {
  entry: './example/entry.js',
  plugins: [new ServeWebpackPlugin(), new MessageWebpackPlugin()],
  stats: 'none'
}
