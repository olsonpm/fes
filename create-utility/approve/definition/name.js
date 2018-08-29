//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { validUtilityNameRe } from '../../helpers'

//
//------//
// Main //
//------//

const approveName = definition => {
  const givenKeys = new Set(Object.keys(definition)),
    { name } = definition

  if (!givenKeys.has('name'))
    return new Error('this utility does not have a name')
  else if (!name || typeof name !== 'string')
    return new Error(
      "the utility's name must be a string with one or more characters"
    )
  else if (!validUtilityNameRe.test(name)) {
    return new Error(
      tedent(`
        the utility's name must pass the regex '${validUtilityNameRe}'

        name given: ${name}
      `)
    )
  }
}

//
//---------//
// Exports //
//---------//

export default approveName
