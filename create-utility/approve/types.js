//---------//
// Imports //
//---------//

import tedent from 'tedent'

import {
  getFirstValue_iterable as getFirstValue,
  getType,
  join_array,
  join_set,
  keepWhen_array as keepWhen,
  map_array as map,
  mMap_array as mMap,
  passThrough,
  reduce_array as reduce,
} from '../../lib'

import { formatGivenArgument } from '../helpers'

//
//------//
// Main //
//------//

const approveTypes = arg => {
  const { areSupportArguments, args, expectedTypes, name } = arg,
    maybeSupportArguments = areSupportArguments
      ? 'support arguments'
      : 'arguments'

  return passThrough(args, [
    map(toIndexAndArgument),
    keepWhen(argumentIsWrongType),
    mMap(toIndexAndErrorMessage),
    reduce(toAllIndecesAndMessages, { indices: [], messages: [] }),
    toInvalidTypeErrorMessage,
  ])

  // scoped helper functions

  function toInvalidTypeErrorMessage({ indices, messages }) {
    if (!indices.length) return

    const truncatedArgs = passThrough(indices, [
        map(argIdx => ({ anArg: args[argIdx], argIdx })),
        mMap(formatGivenArgument),
      ]),
      firstLine = `'${name}' was passed one or more ${maybeSupportArguments} with incorrect types`

    return tedent(`
      ${firstLine}
      ${join_array('\n\n')(messages)}

      ${join_array('\n\n')(truncatedArgs)}
    `)
  }

  function toIndexAndErrorMessage({ index, argument }) {
    const actualType = getType(argument),
      setOfExpectedTypes = expectedTypes[index],
      initialMessage = `Argument ${index} has type '${actualType}' but was supposed to have `,
      restOfMessage =
        setOfExpectedTypes.size > 1
          ? `one of the following types: ${join_set(', ')(setOfExpectedTypes)}`
          : `the type '${getFirstValue(setOfExpectedTypes)}'`,
      errorMessage = initialMessage + restOfMessage

    return { index, errorMessage }
  }

  function argumentIsWrongType({ index, argument }) {
    const setOfExpectedTypes = expectedTypes[index]
    if (setOfExpectedTypes.has('any')) return false

    const actualType = getType(argument)

    return !setOfExpectedTypes.has(actualType)
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function toIndexAndArgument(argument, index) {
  return { index, argument }
}

function toAllIndecesAndMessages(result, { index, errorMessage }) {
  const { indices, messages } = result

  indices.push(index)
  messages.push(errorMessage)

  return result
}

//
//---------//
// Exports //
//---------//

export default approveTypes
