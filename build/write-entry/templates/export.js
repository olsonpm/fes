const { filenameToDefaultName } = require('./helpers')

module.exports = utilityFileNames => {
  const exportContents = utilityFileNames
    .map(filenameToDefaultName)
    .map(name => `  ${name},`)
    .join('\n')

  return `export {
${exportContents}
}`
}
