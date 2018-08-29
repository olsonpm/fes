//---------//
// Imports //
//---------//

import tedent from 'tedent'

import approveTypes from './types'
import keepFirst from '../../lib/non-curried/keep-first'

import { formatGivenArgument } from '../helpers'
import {
  findFirstValueWithTruthyKey,
  join_array as join,
  map_array as map,
  mMap_array as mMap,
  passThrough,
} from '../../lib'

//
//------//
// Main //
//------//

const approveNonDataArguments = (...args) => {
  const definition = args[1]

  const approve = findFirstValueWithTruthyKey([
    [args.length === 3, approveDataDependentSupportArgs],
    [definition.hasNoDataArgument, approveNoDataArgumentArgs],
    [true, approveRegularSupportArguments],
  ])

  return approve(...args)
}

//
//------------------//
// Helper Functions //
//------------------//

function approveCommon(arg) {
  const {
      areSupportArguments,
      args,
      authorDefinedApproveArguments,
      expectedTypes,
      name,
      shouldThrowOnExtraArguments,
    } = arg,
    numberOfExpectedArguments = expectedTypes.length

  if (
    args.length < numberOfExpectedArguments ||
    (shouldThrowOnExtraArguments && args.length > numberOfExpectedArguments)
  ) {
    const truncatedArgs = passThrough(args, [
        map((anArg, argIdx) => ({ anArg, argIdx })),
        mMap(formatGivenArgument),
      ]),
      maybeSupport = areSupportArguments ? 'support ' : '',
      oneOrMoreArguments =
        numberOfExpectedArguments > 1 ? 'arguments' : 'argument'

    return new Error(
      tedent(`
        The function '${name}' requires ${numberOfExpectedArguments} ${maybeSupport}${oneOrMoreArguments}.
          You passed ${args.length}.

        ${join('\n\n')(truncatedArgs)}
      `)
    )
  }

  const errorMessage = approveTypes({
    areSupportArguments,
    args: keepFirst(numberOfExpectedArguments, args),
    expectedTypes,
    name,
  })
  if (errorMessage) return new Error(errorMessage)

  // might also be a function or undefined
  const maybeError = authorDefinedApproveArguments(...args)
  if (maybeError) return maybeError
}

function approveDataDependentSupportArgs(args, definition, type) {
  const { isFlipped, name, typeToDataDependentProps } = definition,
    { approveSupportArguments, expectedSupportArgumentTypes: expectedTypes } =
      typeToDataDependentProps[type] || typeToDataDependentProps.any

  return approveCommon({
    areSupportArguments: true,
    args,
    authorDefinedApproveArguments: approveSupportArguments,
    expectedTypes,
    name,
    shouldThrowOnExtraArguments: !isFlipped,
  })
}

function approveNoDataArgumentArgs(args, definition) {
  const { hasNoDataArgument, name } = definition

  const {
    approveArguments,
    expectedArgumentTypes: expectedTypes,
    shouldThrowOnExtraArguments,
  } = hasNoDataArgument

  return approveCommon({
    areSupportArguments: false,
    args,
    authorDefinedApproveArguments: approveArguments,
    expectedTypes,
    name,
    shouldThrowOnExtraArguments,
  })
}

function approveRegularSupportArguments(args, definition) {
  const {
    approveSupportArguments,
    expectedSupportArgumentTypes: expectedTypes,
    isFlipped,
    name,
  } = definition

  return approveCommon({
    areSupportArguments: true,
    args,
    authorDefinedApproveArguments: approveSupportArguments,
    expectedTypes,
    name,
    shouldThrowOnExtraArguments: !isFlipped,
  })
}

//
//---------//
// Exports //
//---------//

export default approveNonDataArguments
