//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { getHasSupportArguments, setOfTypedArrayTypes } from '../helpers'

import {
  containsAll_set as containsAll,
  discardAll_set as discardAll,
  discardWhen_array as discardWhen,
  flow,
  formatGivenArgument,
  getType,
  getValueAtPath,
  isLaden_hasLength as isLaden,
  join_array as join,
  jstring,
  map_array as map,
  mMap_array as mMap,
  passThrough,
  strictlyEquals,
  truncateToNLines,
} from '../../lib'

//
//------//
// Init //
//------//

const getTypeAnyToFunction = getValueAtPath(['typeToFunction', 'any']),
  getTypeAnyToDataDependentProps = getValueAtPath([
    'typeToDataDependentProps',
    'any',
  ]),
  truncateDataArg = flow([jstring, truncateToNLines(3)])

//
//------//
// Main //
//------//

const approveDataArgument = (args, definition, opts = {}) => {
  const {
    isArrayOfData,
    isFlipped,
    name,
    typeToDataDependentProps,
    typeToFunction,
  } = definition

  const shouldEnforceSingleDataArgument =
    isFlipped || !getHasSupportArguments(definition)

  let maybeError

  if (
    args.length === 0 ||
    (shouldEnforceSingleDataArgument && args.length > 1)
  ) {
    const truncatedArgs = passThrough(args, [
      map((anArg, argIdx) => ({ anArg, argIdx })),
      mMap(formatGivenArgument),
    ])

    return new Error(
      tedent(`
        A single data argument is required for '${name}'
          You passed ${args.length}.

        ${join('\n\n')(truncatedArgs)}
      `)
    )
  }

  const dataArg = args[0],
    type = getType(dataArg)

  if (isArrayOfData) {
    if (type !== 'array') {
      return new Error(
        tedent(`
          The function '${name}' was passed a data argument type of
            '${type}' but requires an array

          Data argument passed: ${truncateDataArg(dataArg)}
        `)
      )
    }

    maybeError = approveElementTypes(dataArg, name, opts.arrayOfDataType)
    if (maybeError) return maybeError
  } else if (!takesAnyDataType(definition)) {
    const dataTypes = Object.keys(typeToFunction || typeToDataDependentProps),
      setOfValidDataTypes = new Set(dataTypes)

    if (!setOfValidDataTypes.has(type)) {
      const validDataTypesString = passThrough(setOfValidDataTypes, [
        consolidateTypedArrays,
        toArray,
        sort,
        join(', '),
      ])
      return new Error(
        tedent(`
          The function '${name}' was passed a data argument type of '${type}'

          Allowed types: ${validDataTypesString}

          Data argument passed: ${truncateDataArg(dataArg)}
        `)
      )
    }
  }

  //
  //  TODO: figure out a cleaner, more readable way to write this.  I'm coming
  //    up empty at the moment.
  //
  if (isArrayOfData && typeToDataDependentProps) {
    const {
      approveDataArgument: authorDefinedApproveDataArgument,
    } = typeToDataDependentProps[opts.arrayOfDataType]

    if (authorDefinedApproveDataArgument) {
      maybeError = authorDefinedApproveDataArgument(dataArg)
      if (maybeError) return maybeError
    }
  } else if (typeToDataDependentProps) {
    const { approveDataArgument: authorDefinedApproveDataArgument } =
      typeToDataDependentProps[type] || typeToDataDependentProps.any

    if (authorDefinedApproveDataArgument) {
      maybeError = authorDefinedApproveDataArgument(dataArg)
      if (maybeError) return maybeError
    }
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function toArray(aSet) {
  return [...aSet]
}

function sort(anArray) {
  return anArray.sort()
}

function consolidateTypedArrays(setOfValidDataTypes) {
  let result = setOfValidDataTypes
  if (containsAll(setOfTypedArrayTypes)(setOfValidDataTypes)) {
    result = discardAll(setOfTypedArrayTypes)(setOfValidDataTypes)
    result.add('any typed array e.g. int8Array or float32Array')
  }

  return result
}

function takesAnyDataType(definition) {
  return (
    getTypeAnyToFunction(definition) ||
    getTypeAnyToDataDependentProps(definition)
  )
}

function approveElementTypes(arrayOfData, name, type) {
  const invalidElements = discardWhen(flow([getType, strictlyEquals(type)]))(
    arrayOfData
  )

  if (isLaden(invalidElements)) {
    const firstInvalidElement = invalidElements[0],
      firstInvalidElementString = passThrough(firstInvalidElement, [
        jstring,
        truncateToNLines(3),
      ])

    return new Error(
      tedent(`
        The function '${name}.${type}s' was passed at least one element of an incorrect type

        first invalid element
          type: ${getType(firstInvalidElement)}
          value: ${firstInvalidElementString}
      `)
    )
  }
}

//
//---------//
// Exports //
//---------//

export default approveDataArgument
