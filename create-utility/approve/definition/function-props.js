//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { getGenericHeader, getInvalidFunctionPropMessage } from './helpers'

//
//------//
// Init //
//------//

const functionProps = [
  'groupToFunction',
  'transformSupportArguments',
  'typeToFunction',
]

//
//------//
// Main //
//------//

const approveFunctionProps = definition => {
  const invalidPropMessage = getInvalidFunctionPropMessage(
    functionProps,
    definition
  )
  if (invalidPropMessage) {
    return new Error(
      tedent(`
        ${getGenericHeader(definition)}
        ${invalidPropMessage}
      `)
    )
  }
}

//
//---------//
// Exports //
//---------//

export default approveFunctionProps
