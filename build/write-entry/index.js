//---------//
// Imports //
//---------//

const pify = require('pify')

const path = require('path'),
  pFs = pify(require('fs'))

const mainExportsTemplate = require('./templates/main')

//
//------//
// Init //
//------//

const definitionsDirectory = path.join(__dirname, '../../lib/definitions'),
  logError = anError => {
    // eslint-disable-next-line no-console
    console.error(anError)
  },
  outputFile = path.join(__dirname, '../../index.js')

//
//------//
// Main //
//------//

const writeMainExports = () => {
  return getDefinitionFileNames()
    .then(utilityFileNames => {
      const contents = mainExportsTemplate(utilityFileNames)
      return pFs.writeFile(outputFile, contents)
    })
    .catch(logError)
}

//
//------------------//
// Helper Functions //
//------------------//

function getDefinitionFileNames() {
  return pFs
    .readdir(definitionsDirectory)
    .then(fileNames => fileNames.map(removeDotJs))
}

function removeDotJs(filename) {
  return filename.slice(0, -3)
}

//
//---------//
// Exports //
//---------//

module.exports = writeMainExports
