import { isIPv4 } from 'net'
import { networkInterfaces } from 'os'
import { Entry, EntryFunc } from 'webpack'

/**
 * 获取本机ip数组
 */
const localIps = (): string[] => {
  let ips = []
  const networks = networkInterfaces()
  Object.values(networks).forEach(item => {
    item.forEach(({ address }) => {
      if (isIPv4(address) && address !== '127.0.0.1') {
        ips.push(address)
      }
    })
  })
  return ips
}

export { localIps }