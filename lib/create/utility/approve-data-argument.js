//---------//
// Imports //
//---------//

import dedent from 'dedent'

import {
  containsAll_set as containsAll,
  discardAll_set as discardAll,
  flow,
  join_arrayLike as join,
  join_set,
  jstring,
  map_arrayLike as map,
  mMap_arrayLike as mMap,
  passThrough,
  truncateToNLines,
} from '../../internal'

import { getType } from '../../helpers'
import { formatGivenArgument, setOfTypedArrays } from './helpers'

//
//------//
// Init //
//------//

const truncateDataArg = flow([jstring, truncateToNLines(3)])

//
//------//
// Main //
//------//

export default function approveDataArgument(
  args,
  authorDefinedApproveArguments,
  definition,
  specialCaseProperties = {}
) {
  const { takesAnyDataType } = specialCaseProperties,
    {
      name,
      isArrayOfData,
      shouldThrowOnExtraDataArguments,
      typeToDataDependentProps,
      typeToFunction,
    } = definition

  // it's not possible for args.length === 0 here
  if (args.length !== 1 && shouldThrowOnExtraDataArguments) {
    const truncatedArgs = passThrough(args, [
      map((anArg, argIdx) => ({ anArg, argIdx })),
      mMap(formatGivenArgument),
    ])

    return new Error(
      dedent(`
        You passed more than a single data argument to '${name}'
        Number of arguments passed: ${args.length}

        ${join('\n\n')(truncatedArgs)}
      `)
    )
  }

  const dataArg = args[0]

  if (isArrayOfData) {
    const dataType = getType(dataArg)
    if (dataType !== 'array') {
      return new Error(
        dedent(`
          The function '${name}' was passed a data argument type of
            '${dataType}' but requires an array

          Data argument passed: ${truncateDataArg(dataArg)}
        `)
      )
    }
  } else if (!takesAnyDataType) {
    const dataTypes = Object.keys(typeToFunction || typeToDataDependentProps),
      setOfValidDataTypes = new Set(dataTypes),
      dataType = getType(dataArg)

    if (!setOfValidDataTypes.has(dataType)) {
      const validDataTypesString = passThrough(setOfValidDataTypes, [
        consolidateTypedArrays,
        join_set(', '),
      ])
      return new Error(
        dedent(`
          The function '${name}' was passed a data argument type
            of '${dataType}'

          Allowed types: ${validDataTypesString}

          Data argument passed: ${truncateDataArg(dataArg)}
        `)
      )
    }
  }

  // might also be a function or undefined
  const maybeError = authorDefinedApproveArguments(dataArg)
  if (getType(maybeError) === 'error') return maybeError
}

function consolidateTypedArrays(setOfValidDataTypes) {
  let result = setOfValidDataTypes
  if (containsAll(setOfTypedArrays)(setOfValidDataTypes)) {
    result = discardAll(setOfTypedArrays)(setOfValidDataTypes)
    result.add('any typed array e.g. int8Array or float32Array')
  }

  return result
}
