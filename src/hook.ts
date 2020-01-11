import chalk from 'chalk'
import { Compiler } from 'webpack'
import formatWebpackMessages from './format'
import { MessageWebpackPluginOptions } from './types'
import { localIps, occupyPort } from './utils'

const pluginName = 'MessageWebpackPlugin'

export default (options: MessageWebpackPluginOptions = {}, compiler: Compiler) => {
  const { invalid, done } = compiler.hooks
  const { onSuccess, onError, onWarning, servePort } = options

  const isTTY = process.stdout.isTTY
  const clearConsole = () =>
    process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H')

  invalid.tap(pluginName, () => {
    console.log(1)
    if (isTTY && compiler.options.mode === 'development') clearConsole()
    console.log(`\n🛠 ${chalk.green('正在编译...')}`)
  })

  done.tap(pluginName, stats => {
    const timerStr = chalk.gray(`用时：${(stats.endTime - stats.startTime) / 1000}s`)
    const isDev = compiler.options.mode === 'development'
    if (isTTY && isDev) clearConsole()

    if (!stats.hasErrors() && !stats.hasWarnings()) {
      console.log(`\n✅ ${chalk.green('编译成功!')} ${timerStr}`)
      if (isDev && !occupyPort(servePort)) {
        console.log('\n在浏览器打开以下地址浏览.\n')
        console.log(`  本地地址：${chalk.underline(`http://localhost:${servePort}`)}`)
        localIps()
          .map(ip => `  网络地址: ${chalk.underline(`http://${ip}:${servePort}`)}`)
          .forEach(msg => {
            console.log(msg)
          })
      }
      onSuccess && onSuccess()
      return
    }

    const message = formatWebpackMessages(
      stats.toJson({
        all: false,
        warnings: true,
        errors: true
      }),
      compiler.context
    )

    if (message.errors.length > 0) {
      console.log(`\n⭕️ ${chalk.red('编译失败！')} ${timerStr}\n`)
      if (onError) {
        onError(stats.compilation.errors)
      } else {
        console.log(message.errors.join('\n\n'))
      }
      return
    }

    if (message.warnings.length > 0) {
      console.log(`\n❔ ${chalk.yellow('编译警告！')} ${timerStr}\n`)
      if (onWarning) {
        onWarning(stats.compilation.warnings)
      } else {
        console.log(message.warnings.join('\n\n'))
      }
      return
    }
  })
}
