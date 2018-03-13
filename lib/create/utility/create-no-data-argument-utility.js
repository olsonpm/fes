//---------//
// Imports //
//---------//

import approveTypes from './approve-types'
import identity from '../../internal/return-first-argument'
import join from '../../internal/join_array-like'
import map from '../../internal/map_array-like'
import mMap from '../../internal/m-map_array-like'
import passThrough from '../../internal/pass-through'

import { formatGivenArgument, throwOrReject } from './helpers'

//
//------//
// Main //
//------//

const createNoDataArgumentUtility = definition => {
  const { hasNoDataArgument, isAsynchronous, name } = definition,
    {
      expectedArgumentTypes,
      shouldThrowOnExtraArguments = true,
      theFunction,
      transformResult = identity,
    } = hasNoDataArgument

  return (...args) => {
    const error = approveArguments(args)

    if (error) return throwOrReject(error, isAsynchronous)

    // no errors, we good fam

    return transformResult(theFunction(...args))
  }

  // scoped helper functions

  function approveArguments(args) {
    const numberOfExpectedArguments = Object.keys(expectedArgumentTypes).length

    if (
      args.length < numberOfExpectedArguments ||
      (shouldThrowOnExtraArguments && args.length > numberOfExpectedArguments)
    ) {
      const truncatedArgs = passThrough(args, [
        map((anArg, argIdx) => ({ anArg, argIdx })),
        mMap(formatGivenArgument),
      ])

      return new Error(
        `The function '${name}' requires ${numberOfExpectedArguments}` +
          ` arguments.   You passed ${args.length}.` +
          `\n\n${join('\n\n')(truncatedArgs)}`
      )
    }

    const errorMessage = approveTypes({
      args,
      expectedArgumentTypes,
      name,
    })
    if (errorMessage) return new Error(errorMessage)
  }
}

//
//---------//
// Exports //
//---------//

export default createNoDataArgumentUtility
