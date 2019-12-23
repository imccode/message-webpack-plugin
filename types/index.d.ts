import { Compiler } from 'webpack';
import { MessageWebpackPluginOptions } from './types';
import formatWebpackMessages from './format';
/**
 * 消息webpack插件
 */
declare class MessageWebpackPlugin {
    options: MessageWebpackPluginOptions;
    constructor(options?: MessageWebpackPluginOptions);
    /**
     * 注入默认配置
     * @param compiler
     */
    inject(compiler: Compiler): void;
    /**
     * 执行插件
     * @param compiler
     */
    apply(compiler: Compiler): void;
}
export * from './types';
export { MessageWebpackPlugin, formatWebpackMessages };
export default MessageWebpackPlugin;
