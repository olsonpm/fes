const createUtilityTemplate = require('./create-utility'),
  exportTemplate = require('./export')

module.exports = utilityFileNames => {
  const createUtilities = utilityFileNames
    .map(createUtilityTemplate)
    .join('\n\n')

  const exportSection = exportTemplate(utilityFileNames)

  return `import createUtility from './lib/create/utility'

${createUtilities}

${exportSection}
`
}
