//---------//
// Imports //
//---------//

const chalk = require('chalk'),
  path = require('path'),
  sane = require('sane')

const writeEntry = require('../write-entry')

//
//------//
// Init //
//------//

const highlight = chalk.green,
  pathToLibDirectory = path.join(__dirname, '../../lib')

//
//------//
// Main //
//------//

/* eslint-disable no-console */
const watchLib = () => {
  const watcher = sane(pathToLibDirectory, { watchman: true })
  watcher.on('add', filepath => {
    console.log(`file added: ${highlight(filepath)}`)
    writeEntry()
  })
  watcher.on('delete', filepath => {
    console.log(`file deleted: ${highlight(filepath)}`)
    writeEntry()
  })

  writeEntry()
  console.log(`watching ${highlight(pathToLibDirectory)}`)
}
/* eslint-enable no-console */

//
//---------//
// Exports //
//---------//

module.exports = watchLib
