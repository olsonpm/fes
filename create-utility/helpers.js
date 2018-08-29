//---------//
// Imports //
//---------//

import {
  all_array as all,
  discardWhen_array as discardWhen,
  findFirstValueWithTruthyKey,
  getFirstValue_object as getFirstValue,
  getValueAt,
  hasKey_object as hasKey,
  isLaden_hasLength,
  isLaden_object,
  jstring,
  passThrough,
  truncateToNLines,
} from '../lib'

//
//------//
// Init //
//------//

const areLadenStrings = isLadenString

//
//------//
// Main //
//------//

//
// we can be assured 'expectedTypes' is an array
//
const approveExpectedTypes = expectedTypes => {
  const invalidExpectedTypes = discardWhen(isValidExpectedType)(expectedTypes)
  if (isLaden_hasLength(invalidExpectedTypes))
    return invalidExpectedTypes.join('\n')
}

const formatGivenArgument = ({ anArg, argIdx }) => {
  const argToString = passThrough(anArg, [jstring, truncateToNLines(3)])

  return `Argument ${argIdx} given: ${argToString}`
}

//
// yes this is a little confusing, but because we only explicitly declare
//   'hasNoDataArgument', the double negative is unfortunately necessary.
//
const getHasDataArgument = definition => !getHasNoDataArgument(definition)

const getHasSupportArguments = definition =>
  !!recursivelyFind(definitionHasSupportArguments, definition)

//
// the type of utility will be one of four strings
//   no-data
//   just-data
//   supported-data
//   array-of-data
//
const getUtilityType = definition => {
  const hasNoDataArgument = getHasNoDataArgument(definition),
    isArrayOfData = recursivelyFind(getValueAt('isArrayOfData'), definition),
    hasSupportArguments = getHasSupportArguments(definition)

  return findFirstValueWithTruthyKey([
    [hasNoDataArgument, 'no-data'],
    [isArrayOfData, 'array-of-data'],
    [hasSupportArguments, 'supported-data'],
    [!hasSupportArguments, 'just-data'],
  ])
}

const recursivelyFind = (predicate, definition) => {
  const { flippedFrom, mergeDefinitionWith, name } = definition

  let result = predicate(definition) && name

  if (result) return name
  else {
    result = flippedFrom && recursivelyFind(predicate, flippedFrom)
  }

  if (result) return `${name} flippedFrom -> ${result}`
  else {
    result =
      mergeDefinitionWith && recursivelyFind(predicate, mergeDefinitionWith)
  }

  if (result) return `${name} mergeDefinitionWith -> ${result}`
}

const setOfTypedArrayTypes = new Set([
  'float32Array',
  'float64Array',
  'int16Array',
  'int32Array',
  'int8Array',
  'uint16Array',
  'uint32Array',
  'uint8Array',
  'uint8ClampedArray',
])

const validUtilityNameRe = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/

//
//------------------//
// Helper Functions //
//------------------//

function definitionHasSupportArguments(definition) {
  if (isLaden_hasLength(definition.expectedSupportArgumentTypes || []))
    return true

  //
  // this check is a little weird because utilities with support arguments may
  //   have them defined via 'mergeDefinitionWith' or 'flippedFrom'.  At some
  //   point through the recursion, a root utility must exist where support
  //   arguments are either defined at the root or in each of their
  //   data-dependent props.  It is impossible for a utility to declare support
  //   arguments for some data types and not others.
  //
  const firstValue =
    maybeGetFirstValue(definition.typeToDataDependentProps) || {}

  return isLaden_hasLength(firstValue.expectedSupportArgumentTypes || [])
}

function getHasNoDataArgument(definition) {
  return !!recursivelyFind(hasKey('hasNoDataArgument'), definition)
}

function isLadenString(something) {
  return something && typeof something === 'string'
}

function isValidExpectedType(oneOrMoreExpectedTypes) {
  if (Array.isArray(oneOrMoreExpectedTypes))
    return all(areLadenStrings)(oneOrMoreExpectedTypes)
  else return isLadenString(oneOrMoreExpectedTypes)
}

function maybeGetFirstValue(something) {
  return something && typeof something === 'object' && isLaden_object(something)
    ? getFirstValue(something)
    : undefined
}

//
//---------//
// Exports //
//---------//

export {
  approveExpectedTypes,
  formatGivenArgument,
  getHasDataArgument,
  getHasSupportArguments,
  getUtilityType,
  recursivelyFind,
  setOfTypedArrayTypes,
  validUtilityNameRe,
}
