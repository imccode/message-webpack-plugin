import chalk from 'chalk'
import { Stats } from 'webpack'
import path from 'path'
import { existsSync } from 'fs'

const friendlySyntaxErrorLabel = 'Syntax error:'
const friendlyParsingErrorLabel = 'Parsing error:'

const hasError = (message: string) =>
  message.includes(friendlySyntaxErrorLabel) || message.includes(friendlyParsingErrorLabel)

const lineErrorString = (label: string, message: string, line: string, columm: string) =>
  `${chalk.bold(`Line ${line}:${columm}`)} ${label} ${message.trim()}`

// Cleans up webpack error messages.
const formatMessage = (message: string, context: string): string => {
  let lines = message.split('\n')

  lines = lines.filter(line => {
    if (/^Module\s[A-z ]+\(from/i.test(line)) return false
    if (/^Thread\sLoader/i.test(line)) return false
    if (/^Require\sstack/i.test(line)) return false
    if (/^\s*at\s/i.test(line)) return false
    if (/^\s*\-?\s(Compiler|Hook|Compilation)\.js:\d+/i.test(line)) return false
    if (/^\s*\-\s\S+/i.test(line)) return false
    if (line.includes('Module failed because of a eslint error')) return false
    return true
  })

  lines = lines.map(line => {
    if (line === 'SyntaxError') return ''

    // SyntaxError: ./App.js: Unexpected token, expected "{" (5:14)"
    let parsingError = /(SyntaxError: )*\S+:(( \S+)*) \((\d+):(\d+)\)/.exec(line)
    if (parsingError) {
      const [, , errorMessage, , errorLine, errorColumn] = parsingError
      return lineErrorString(friendlySyntaxErrorLabel, errorMessage, errorLine, errorColumn)
    }

    // (7:24) Unknown word
    parsingError = /^\((\d+):(\d+)\)(( \S+)*)/.exec(line)
    if (parsingError) {
      const [, errorLine, errorColumn, errorMessage] = parsingError
      return lineErrorString(friendlySyntaxErrorLabel, errorMessage, errorLine, errorColumn)
    }

    return line
  })

  message = lines.join('\n')

  message = message.replace(
    /SyntaxError\s+\((\d+):(\d+)\)\s*(.+?)\n/g,
    `${friendlySyntaxErrorLabel} $3 ($1:$2)\n`
  )
  // Clean up export errors
  message = message.replace(
    /^.*export '(.+?)' was not found in '(.+?)'.*$/gm,
    `Attempted import error: '$1' is not exported from '$2'.`
  )
  message = message.replace(
    /^.*export 'default' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
    `Attempted import error: '$2' does not contain a default export (imported as '$1').`
  )
  message = message.replace(
    /^.*export '(.+?)' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
    `Attempted import error: '$1' is not exported from '$3' (imported as '$2').`
  )
  lines = message.split('\n')

  if (lines.length > 2 && lines[1].trim() === '') {
    lines.splice(1, 1)
  }
  lines[0] = lines[0].replace(/^(.*) \d+:\d+-\d+$/, '$1')

  if (lines[1] && lines[1].includes('Module not found: ')) {
    lines = [
      lines[0],
      lines[1]
        .replace('Error: ', '')
        .replace('Module not found: Cannot find file:', 'Cannot find file:')
    ]
  }

  if (lines[1] && lines[1].match(/Cannot find module.+node-sass/)) {
    lines[1] = 'To import Sass files, you first need to install node-sass.\n'
    lines[1] += 'Run `npm install node-sass` or `yarn add node-sass` inside your workspace.'
  }

  if (existsSync(path.resolve(context, lines[0]))) {
    lines[0] = chalk.cyan.bold(lines[0])
  } else {
    lines[0] = chalk.red(lines[0].replace('Error: ', ''))
  }

  message = lines.join('\n')

  return message.trim()
}

function formatWebpackMessages(statsJson: Stats.ToJsonOutput, context: string) {
  const formattedErrors: string[] = statsJson.errors.map(message => formatMessage(message, context))
  const formattedWarnings: string[] = statsJson.warnings.map(message => formatMessage(message, context))

  return {
    warnings: formattedWarnings,
    errors: formattedErrors
  }
}

export default formatWebpackMessages
