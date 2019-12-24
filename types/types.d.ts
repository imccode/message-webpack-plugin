/**
 * message-webpack-plugin webpack消息插件
 */
export interface MessageWebpackPluginOptions {
    /** devServe服务消息端口 */
    servePort?: number;
    /** 是否需要构建进度消息 */
    progress?: boolean;
    /**
     * 编译完成回调
     */
    onSuccess?(): void;
    /**
     * 编译失败回调
     */
    onError?(errors: any[]): void;
    /**
     * 编译警告回调
     */
    onWarning?(warnings: any[]): void;
}
