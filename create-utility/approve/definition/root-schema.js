//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { makeMatchesSchema, makeToInvalidTypeMessage } from './helpers'

import {
  discardAll_set as discardAll,
  discardWhen_object as discardWhen,
  getArrayOfValues,
  getFirstValue_iterable as getFirstValue,
  getSetOfKeys,
  getSize_object as getSize,
  isLaden_hasSize,
  isLaden_object,
  join_array,
  join_set,
  map_object as map,
  passThrough,
} from '../../../lib'

//
//------//
// Init //
//------//

const schema = getSchema(),
  matchesSchema = makeMatchesSchema(schema),
  toInvalidTypeMessage = makeToInvalidTypeMessage(schema),
  validKeys = getSetOfKeys(schema)

//
//------//
// Main //
//------//

const approveRootSchema = definition => {
  const givenKeys = getSetOfKeys(definition),
    { name } = definition

  const unexpectedProperties = discardAll(validKeys)(givenKeys)
  if (isLaden_hasSize(unexpectedProperties)) {
    if (unexpectedProperties.size > 1) {
      return new Error(
        tedent(`
          the definition for '${name}' has some unexpected properties

          ${join_set(', ')(unexpectedProperties)}
        `)
      )
    } else {
      const unexpectedProperty = getFirstValue(unexpectedProperties)
      return new Error(
        `the definition for '${name}' has the unexpected property '${unexpectedProperty}'`
      )
    }
  }

  const invalidProperties = discardWhen(matchesSchema)(definition)
  if (isLaden_object(invalidProperties)) {
    const oneOrMoreProperties =
        getSize(invalidProperties) > 1 ? 'some properties' : 'a property',
      invalidTypeMessage = passThrough(invalidProperties, [
        map(toInvalidTypeMessage),
        getArrayOfValues,
        join_array('\n'),
      ])

    return new Error(
      tedent(`
        the definition for '${name}' has ${oneOrMoreProperties} with an invalid type
          ${invalidTypeMessage}
      `)
    )
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function getSchema() {
  return {
    approveSupportArguments: 'function',
    expectedSupportArgumentTypes: 'array',
    flippedFrom: 'object',
    groupToDataDependentProps: 'object',
    groupToFunction: 'object',
    hasNoDataArgument: 'object',
    isArrayOfData: 'boolean',
    isAsynchronous: 'boolean',
    mergeDefinitionWith: 'object',
    name: 'string',
    transformResult: 'function',
    transformSupportArguments: new Set(['array', 'object']),
    typeToDataDependentProps: 'object',
    typeToFunction: 'object',
  }
}

//
//---------//
// Exports //
//---------//

export default approveRootSchema
