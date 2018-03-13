//---------//
// Imports //
//---------//

import {
  first_mapOrSet as first,
  join_arrayLike,
  join_set,
  jstring,
  keepFirst_arrayLike as keepFirst,
  keepWhen_arrayLike as keepWhen,
  map_arrayLike as map,
  passThrough,
  reduce_arrayLike as reduce,
} from '../../internal'

import { formatGivenArgument } from './helpers'
import { getType } from '../../helpers'

//
//------//
// Main //
//------//

//
// TODO: separate this method in two.  One for argumentTypes and one
//   for serviceArgumentTypes
//
const approveTypes = arg => {
  const {
      args,
      expectedArgumentTypes,
      expectedServiceArgumentTypes,
      name,
    } = arg,
    allExpectedTypes = expectedArgumentTypes || expectedServiceArgumentTypes

  // sanity check
  validateArg(arg)

  const areServiceArguments = !!expectedServiceArgumentTypes,
    str = {
      arguments: areServiceArguments ? 'service arguments' : 'arguments',
    },
    functionChain = [
      keepWhen(argumentIsWrongType),
      map(toInvalidTypeError),
      reduce(toAllIndecesAndMessages, { indices: [], messages: [] }),
      toInvalidTypeErrorMessage,
    ]

  if (areServiceArguments) {
    functionChain.unshift(keepFirst(expectedServiceArgumentTypes.length))
  }

  return passThrough(args, functionChain)

  // scoped helper functions

  function toInvalidTypeErrorMessage({ indices, messages }) {
    if (!indices.length) return

    const truncatedArgs = passThrough(indices, [
        map(argIdx => ({ anArg: args[argIdx], argIdx })),
        map(formatGivenArgument),
      ]),
      firstLine =
        `'${name}' was passed one or more ${str.arguments} with` +
        ' incorrect types'

    return (
      firstLine +
      `\n${join_arrayLike('\n\n')(messages)}` +
      `\n\n${join_arrayLike('\n\n')(truncatedArgs)}`
    )
  }

  function toInvalidTypeError(anArg, idx) {
    const actualType = getType(anArg),
      setOfExpectedTypes = allExpectedTypes[idx],
      initialMessage = `Argument ${idx} has type ${actualType} but was supposed to have `,
      restOfMessage =
        setOfExpectedTypes.size > 1
          ? `one of the following types: ${join_set(', ')(setOfExpectedTypes)}`
          : `the type ${first(setOfExpectedTypes)}`,
      message = initialMessage + restOfMessage

    return { idx, message }
  }

  function argumentIsWrongType(anArg, idx) {
    const setOfExpectedTypes = allExpectedTypes[idx]
    if (setOfExpectedTypes.has('any')) return false

    const actualType = getType(anArg)

    return !setOfExpectedTypes.has(actualType)
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function toAllIndecesAndMessages(result, { idx, message }) {
  const { indices, messages } = result

  indices.push(idx)
  messages.push(message)

  return result
}

function validateArg(arg) {
  const { expectedArgumentTypes, expectedServiceArgumentTypes } = arg

  if (expectedArgumentTypes === expectedServiceArgumentTypes) {
    throw new Error(
      'This function requires either a property expectedArgumentTypes or' +
        ' expectedServiceArgumentTypes' +
        `\n\nArgument passed: ${jstring(arg)}`
    )
  } else if (!expectedArgumentTypes && !expectedServiceArgumentTypes) {
    throw new Error(
      'This function requires either a property expectedArgumentTypes OR' +
        ' expectedServiceArgumentTypes, not both' +
        `\n\nArgument passed: ${jstring(arg)}`
    )
  }
}

//
//---------//
// Exports //
//---------//

export default approveTypes
