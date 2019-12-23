import { MessageWebpackPluginOptions } from './types'

// 默认配置
export const defaultOptions: MessageWebpackPluginOptions = {
  servePort: 33333
}

export default (options: MessageWebpackPluginOptions = {}) => {
  const mergeOptions: MessageWebpackPluginOptions = {
    ...defaultOptions,
    ...options
  }

  return mergeOptions
}
