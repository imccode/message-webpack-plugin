import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import { Compiler, ProgressPlugin } from 'webpack'

export default (compiler: Compiler) => {
  let spinner = ora().start()
  /** 构建阶段 */
  let stage = 0

  return new ProgressPlugin((percentage, msg, moduleProgress, activeModules, moduleName) => {
    const progress = `[${Math.round(percentage * 100)}%]`

    if (percentage >= 0 && percentage < 0.1) {
      if (stage > 1) return
      stage = 1
      spinner.start()

      spinner.text = `${chalk.yellow.bold(progress)} ${chalk.yellow('模块编译')}`
      return
    }

    if (percentage >= 0.1 && percentage <= 0.7) {
      if (stage > 2) return
      stage = 2

      if (!moduleName) return
      let formatModuleName = moduleName

      // multi 开头的不处理
      if (/^multi/.test(moduleName)) {
        formatModuleName = ''
      }

      if (formatModuleName.includes('??')) {
        formatModuleName = formatModuleName.split('??')[0]
      }

      if (formatModuleName.includes('!')) {
        formatModuleName = formatModuleName.split('!')[0]
      }

      // 将绝对路径转换为相对路径
      if (formatModuleName.includes(compiler.context)) {
        formatModuleName = path.relative(compiler.context, formatModuleName)
      }

      spinner.text = `${chalk.green.bold(progress)} ${chalk.green('模块构建')} ${
        moduleProgress.split(' ')[0]
      } ${chalk.gray(`-> ${formatModuleName}`)}`
      return
    }

    if (percentage > 0.7 && percentage < 0.95) {
      if (stage > 3) return
      stage = 3

      spinner.text = `${chalk.cyan.bold(progress)} ${chalk.cyan('模块优化...')}`
      return
    }

    if (percentage > 0.95 && percentage < 1) {
      if (stage > 4) return
      stage = 4

      spinner.text = `${chalk.blue.bold(progress)} ${chalk.blue('生成文件...')}`
      return
    }

    stage = 0

    spinner.stop()
    spinner.clear()
  })
}
