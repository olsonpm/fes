const { filenameToDefaultName } = require('./helpers')

module.exports = aUtilityFileName => {
  const defaultName = filenameToDefaultName(aUtilityFileName),
    definition = `${defaultName}_definition`

  return `import ${definition} from './lib/definitions/${aUtilityFileName}'
const ${defaultName} = createUtility(${definition})`
}
