//
// TODO: extract common operations such as finding unexpected and invalid
//   properties, invalid types, etc.  Opportunities to extract should be
//   apparent in the tests
//

//---------//
// Imports //
//---------//

import dataDependentProps from './data-dependent-props'
import expectedSupportArgumentTypes from './expected-support-argument-types'
import flippedFrom from './flipped-from'
import functionProps from './function-props'
import groups from './groups'
import hasNoDataArgument from './has-no-data-argument'
import mergeDefinitionWith from './merge-definition-with'
import name from './name'
import rootSchema from './root-schema'

import tedent from 'tedent'

import { isEmpty_hasLength as isEmpty, startsWith } from '../../../lib'

//
//------//
// Main //
//------//

//
// TODO: come up with a better variable name than 'chain'
//
const approveDefinition = (definition, { chain = [] } = {}) =>
  findFirstError(definition, chain, [
    isAnObject,
    name,
    rootSchema,
    flippedFrom,
    mergeDefinitionWith,
    expectedSupportArgumentTypes,
    functionProps,
    groups,
    dataDependentProps,
    hasNoDataArgument,
  ])

//
//------------------//
// Helper Functions //
//------------------//

function isAnObject(definition) {
  if (!definition || typeof definition !== 'object') {
    return new Error(
      tedent(`
        the utility definition is not an object

        typeof definition: ${typeof definition}
      `)
    )
  }
}

function findFirstError(definition, chain, arrayOfFunctions) {
  for (const aFunction of arrayOfFunctions) {
    const maybeError = aFunction(definition, { approveDefinition, chain })
    if (maybeError) {
      const { message } = maybeError
      //
      // TODO: find a better way to organize this code.  Checking whether the
      //   error starts with 'error found at:' feels wrong
      //
      maybeError.message =
        isEmpty(chain) || startsWith('error found at:')(message)
          ? message
          : tedent(`
          error found at: ${chain.join(' -> ')}

          ${message}
        `)

      return maybeError
    }
  }
}

//
//---------//
// Exports //
//---------//

export default approveDefinition
