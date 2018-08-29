//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { approveExpectedTypes } from '../../helpers'

import {
  discardWhen_object as discardWhen,
  getType,
  isLaden_object,
  join_array,
  map_object as map,
  mAppend,
  passThrough,
  reduce_object as reduce,
} from '../../../lib'

//
//------//
// Main //
//------//

const getGenericHeader = ({ name }) => `the definition for '${name}' is invalid`

const getInvalidFunctionPropMessage = (functionProps, anObject) => {
  for (const prop of functionProps) {
    const somethingToFunction = anObject[prop]
    if (!somethingToFunction) continue

    const maybeInvalidProperties = discardWhen(isAFunction)(somethingToFunction)
    if (isLaden_object(maybeInvalidProperties)) {
      const invalidPropertiesString = getInvalidPropertiesString(
        maybeInvalidProperties
      )
      return tedent(`
        the following properties in '${prop}' are not functions
          ${invalidPropertiesString}
      `)
    }
  }
}

const getInvalidPropertiesString = invalidProperties =>
  passThrough(invalidProperties, [
    map(getType),
    reduce(toPropertyString, []),
    join_array('\n'),
  ])

const makeMatchesSchema = schema => (value, key) => {
  const expected = schema[key],
    actual = getType(value)

  return expected instanceof Set ? expected.has(actual) : expected === actual
}

const makeToInvalidTypeMessage = schema => (value, key) =>
  `'${key}' was given a type '${getType(value)}' but expected '${schema[key]}'`

const maybeApproveExpectedTypes = expectedTypes => {
  return expectedTypes ? approveExpectedTypes(expectedTypes) : undefined
}

//
//------------------//
// Helper Functions //
//------------------//

function isAFunction(something) {
  return typeof something === 'function'
}

function toPropertyString(result, value, key) {
  return mAppend(`${key}: ${value}`)(result)
}

//
//---------//
// Exports //
//---------//

export {
  getGenericHeader,
  getInvalidFunctionPropMessage,
  getInvalidPropertiesString,
  makeMatchesSchema,
  makeToInvalidTypeMessage,
  maybeApproveExpectedTypes,
}
