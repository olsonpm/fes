//---------//
// Imports //
//---------//

import {
  filter_object as filter,
  hasKey_object as hasKey,
  isLaden_object as isLaden,
  isTruthy,
  returnFirstArgument as identity,
  transformProperties_array as transformProperties,
} from '../../internal'

import approveDataArgument from './approve-data-argument'
import approveServiceArguments from './approve-service-arguments'
import createArrayOfDataUtility from './create-array-of-data-utility'
import createNoDataArgumentUtility from './create-no-data-argument-utility'
import createDataDependentUtility from './create-data-dependent-utility'

import { getType } from '../../helpers'
import { findFirstValueWithTruthyKey, throwOrReject } from './helpers'

//
//------//
// Main //
//------//

const handleSpecialCaseUtility = definition => {
  const specialCaseProperties = getSpecialCaseProperties(definition),
    {
      expectedServiceArgumentTypes,
      hasNoDataArgument,
      isArrayOfData,
      typeToDataDependentProps,
    } = definition

  const createUtility = findFirstValueWithTruthyKey([
    [hasNoDataArgument, createNoDataArgumentUtility],
    [isArrayOfData, createArrayOfDataUtility],
    [typeToDataDependentProps, createDataDependentUtility],
    [expectedServiceArgumentTypes, createPseudoCurriedFunction],
    [!expectedServiceArgumentTypes, createUnaryFunction],
  ])

  return createUtility(definition, specialCaseProperties)
}

const utilityIsSpecialCase = definition => {
  return isLaden(getSpecialCaseProperties(definition))
}

//
//------------------//
// Helper Functions //
//------------------//

function getSpecialCaseProperties(definition) {
  const {
    hasDataArgument,
    isArrayOfData,
    isDataFirst,
    isFlipped,
    shouldThrowOnExtraDataArguments,
    shouldThrowOnExtraServiceArguments,
    transformResult,
    transformServiceArguments,
    typeToDataDependentProps,
    typeToFunction,
  } = definition

  const result = filter(isTruthy)({
    hasNoDataArgument: !hasDataArgument,
    hasServiceArgumentTransforms: !!transformServiceArguments,
    isArrayOfData,
    isDataFirst,
    isFlipped,
    takesAnyDataType: !!(
      hasDataArgument && (typeToFunction || typeToDataDependentProps).any
    ),
    transformResult: transformResult !== identity,
    typeToDataDependentProps,
  })

  if (
    hasKey('shouldThrowOnExtraDataArguments', definition) &&
    !shouldThrowOnExtraDataArguments
  ) {
    result.ignoreExtraDataArguments = true
  }

  if (
    hasKey('shouldThrowOnExtraServiceArguments', definition) &&
    !shouldThrowOnExtraServiceArguments
  ) {
    result.ignoreExtraServiceArguments = true
  }

  return result
}

function createUnaryFunction(definition, specialCaseProperties) {
  const {
    approveArguments: authorDefinedApproveArguments,
    isAsynchronous,
    transformResult,
    typeToFunction,
  } = definition

  return (...dataArgs) => {
    const error = approveDataArgument(
      dataArgs,
      authorDefinedApproveArguments,
      definition,
      specialCaseProperties
    )
    if (error) return throwOrReject(error, isAsynchronous)

    // no errors - good to go!

    const validDataArg = dataArgs[0],
      dataType = getType(validDataArg),
      theFunction = typeToFunction[dataType] || typeToFunction.any

    return transformResult(theFunction(validDataArg))
  }
}

function createPseudoCurriedFunction(definition, specialCaseProperties) {
  //
  // remember we will never have a utility that was configured to be data-first
  //   and flipped at the same time.  That gets caught during normalization
  //
  const { isDataFirst, isFlipped } = specialCaseProperties,
    {
      approveArguments: authorDefinedApproveArguments,
      isAsynchronous,
      transformResult,
      transformServiceArguments,
    } = definition,
    [approveFirstArgs, approveSecondArgs] = isDataFirst
      ? [approveDataArgument, approveServiceArguments.independent]
      : [approveServiceArguments.independent, approveDataArgument]

  return (...firstArgs) => {
    let error = approveFirstArgs(
      firstArgs,
      authorDefinedApproveArguments,
      definition,
      specialCaseProperties
    )
    if (error) throw error

    // no errors yet

    return (...secondArgs) => {
      error = approveSecondArgs(
        secondArgs,
        authorDefinedApproveArguments(...firstArgs),
        definition,
        specialCaseProperties
      )
      if (error) return throwOrReject(error, isAsynchronous)

      // success woo woo

      const { typeToFunction } = definition,
        validDataArg = isDataFirst ? firstArgs[0] : secondArgs[0],
        dataType = getType(validDataArg)

      let maybeTransformedFirstArgs = firstArgs

      if (transformServiceArguments) {
        const transformArgs = transformProperties(transformServiceArguments)
        if (isDataFirst) secondArgs = transformArgs(secondArgs)
        else maybeTransformedFirstArgs = transformArgs(firstArgs)
      }

      const theFunction = typeToFunction[dataType] || typeToFunction.any,
        result = isFlipped
          ? theFunction(...secondArgs)(...maybeTransformedFirstArgs)
          : theFunction(...maybeTransformedFirstArgs)(...secondArgs)

      return transformResult(result)
    }
  }
}

//
//---------//
// Exports //
//---------//

export { handleSpecialCaseUtility, utilityIsSpecialCase }
