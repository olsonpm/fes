//---------//
// Imports //
//---------//

import approveTypes from './approve-types'

import { formatGivenArgument } from './helpers'
import { getType } from '../../helpers'
import {
  join_arrayLike as join,
  map_arrayLike as map,
  mMap_arrayLike as mMap,
  passThrough,
} from '../../internal'

//
//------//
// Main //
//------//

//
// expectedServiceArgumentTypes is not extracted from definition because it's
//   also used in `create-type-to-data-utility` which must first determine the
//   data argument type before passing
//   `typeToDataDependentProps[data argument type].expectedServiceArgumentTypes`
//
const common = (
  args,
  authorDefinedApproveArguments,
  definition,
  expectedServiceArgumentTypes
) => {
  const { name, shouldThrowOnExtraServiceArguments } = definition,
    numberOfServiceArguments = expectedServiceArgumentTypes.length

  if (
    (args.length !== numberOfServiceArguments &&
      shouldThrowOnExtraServiceArguments) ||
    (args.length < numberOfServiceArguments &&
      !shouldThrowOnExtraServiceArguments)
  ) {
    const truncatedArgs = passThrough(args, [
      map((anArg, argIdx) => ({ anArg, argIdx })),
      mMap(formatGivenArgument),
    ])

    return new Error(
      `The function '${name}' requires ${numberOfServiceArguments} service` +
        ` arguments.   You passed ${args.length}.` +
        `\n\n${join('\n\n')(truncatedArgs)}`
    )
  }

  const errorMessage = approveTypes({
    args,
    expectedServiceArgumentTypes,
    name,
  })
  if (errorMessage) return new Error(errorMessage)

  // might also be a function or undefined
  const maybeError = authorDefinedApproveArguments(...args)
  if (getType(maybeError) === 'error') return maybeError
}

const dataDependent = common,
  independent = (args, authorDefinedApproveArguments, definition) =>
    common(
      args,
      authorDefinedApproveArguments,
      definition,
      definition.expectedServiceArgumentTypes
    )

//
//---------//
// Exports //
//---------//

export default { dataDependent, independent }
