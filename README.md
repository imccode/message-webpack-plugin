# message-webpack-plugin

:kissing_heart:一个处理消息的webpack插件。

:point_right:
[![github](https://img.shields.io/github/release-date/imccode/message-webpack-plugin.svg)](https://github.com/imccode/message-webpack-plugin/releases)
[![npm-version](https://img.shields.io/npm/v/message-webpack-plugin.svg)](https://www.npmjs.com/package/message-webpack-plugin)
[![webpack](https://img.shields.io/badge/webpack-%3E%20%3D%204.0.0-blue.svg)](https://webpack.js.org/)
[![nodejs](https://img.shields.io/badge/node-%3E%20%3D%2010.0.0-blue.svg)](https://nodejs.org/)
[![license](https://img.shields.io/npm/l/message-webpack-plugin.svg)](https://www.npmjs.com/package/message-webpack-plugin)
[![pull request](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/imccode/message-webpack-plugin/pulls)

## 安装获取

```shell
yarn add message-webpack-plugin -D

npm install message-webpack-plugin -D

pnpm install message-webpack-plugin -D
```

## 使用方式

```javascript
const MessageWebpackPlugin = require('message-webpack-plugin')

module.exports = {
  plugins: [new MessageWebpackPlugin()]
}
```

```javascript
const MessageWebpackPlugin = require('message-webpack-plugin')

module.exports = {
  plugins: [
    new MessageWebpackPlugin({
      servePort: 8080,
      progress: true,
      onError(errors) {
        conosle.log(errors.join('\n\n'))
      }
    })
  ]
}
```

## 配置项

具体配置项的数据类型见[types.ts](./src/types.ts)

- **servePort** devServe服务消息端口，用于开发环境输出默认访问地址提示。默认: `33333`
- **progress** 是否需要构建进度消息。 默认: `true`
- **onSuccess** 编译完成回调。
- **onError** 编译失败回调。
- **onWarning** 编译警告回调。
