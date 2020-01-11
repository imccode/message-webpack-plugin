import { MessageWebpackPluginOptions } from './types'

// 默认配置
export const defaultOptions: MessageWebpackPluginOptions = {
  servePort: 8080,
  progress: true
}

export default (options: MessageWebpackPluginOptions = {}) => {
  const mergeOptions: MessageWebpackPluginOptions = {
    ...defaultOptions,
    ...options
  }

  return mergeOptions
}
