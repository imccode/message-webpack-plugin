/**
 * 获取本机ip数组
 */
declare const localIps: () => string[];
/**
 * 检查端口是否占用
 * @param port 端口号
 */
declare const occupyPort: (port: number) => boolean;
export { localIps, occupyPort };
