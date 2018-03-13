//---------//
// Imports //
//---------//

import approveDataArgument from './approve-data-argument'
import approveServiceArguments from './approve-service-arguments'
import normalizeDefinition from './normalize/definition'

import { clone_object as clone } from '../../internal'
import { getType } from '../../helpers'
import { findFirstValueWithTruthyKey, throwOrReject } from './helpers'
import { handleSpecialCaseUtility, utilityIsSpecialCase } from './special-case'

//
//------//
// Main //
//------//

const createUtility = definition => {
  definition = normalizeDefinition(clone(definition))

  const { expectedServiceArgumentTypes } = definition

  const createUtilityFrom = findFirstValueWithTruthyKey([
    [utilityIsSpecialCase(definition), handleSpecialCaseUtility],
    [expectedServiceArgumentTypes, createPseudoCurriedFunction],
    [!expectedServiceArgumentTypes, createUnaryFunction],
  ])

  return createUtilityFrom(definition)
}

//
//------------------//
// Helper Functions //
//------------------//

function createUnaryFunction(definition) {
  const {
    approveArguments: authorDefinedApproveArguments,
    isAsynchronous,
    typeToFunction,
  } = definition

  return (...dataArgs) => {
    const error = approveDataArgument(
      dataArgs,
      authorDefinedApproveArguments,
      definition
    )
    if (error) return throwOrReject(error, isAsynchronous)

    // no errors - good to go!

    const validDataArg = dataArgs[0],
      dataType = getType(validDataArg)

    return typeToFunction[dataType](validDataArg)
  }
}

function createPseudoCurriedFunction(definition) {
  const {
    approveArguments: authorDefinedApproveArguments,
    isAsynchronous,
    typeToFunction,
  } = definition

  return (...serviceArgs) => {
    let error = approveServiceArguments.independent(
      serviceArgs,
      authorDefinedApproveArguments,
      definition
    )
    if (error) throw error

    // no errors yet

    return (...dataArgs) => {
      error = approveDataArgument(
        dataArgs,
        authorDefinedApproveArguments(...serviceArgs),
        definition
      )
      if (error) return throwOrReject(error, isAsynchronous)

      // success woo woo

      const validDataArg = dataArgs[0],
        dataType = getType(validDataArg)

      return typeToFunction[dataType](...serviceArgs)(validDataArg)
    }
  }
}

//
//---------//
// Exports //
//---------//

export default createUtility
