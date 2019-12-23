import { Compiler } from 'webpack'
import { MessageWebpackPluginOptions } from './types'
import formatWebpackMessages from './format'
import mergeOptions from './mergeOptions'
import hook from './hook'

/**
 * 消息webpack插件
 */
class MessageWebpackPlugin {
  options: MessageWebpackPluginOptions = {}

  constructor(options: MessageWebpackPluginOptions = {}) {
    this.options = mergeOptions(options)
  }

  /**
   * 注入默认配置
   * @param compiler
   */
  inject(compiler: Compiler) {
    compiler.options.stats = {
      all: false
    }
    compiler.options.performance = false
  }

  /**
   * 执行插件
   * @param compiler
   */
  apply(compiler: Compiler) {
    this.inject(compiler)
    hook(this.options, compiler)
  }
}

export * from './types'
export { MessageWebpackPlugin, formatWebpackMessages }
export default MessageWebpackPlugin
module.exports = MessageWebpackPlugin
