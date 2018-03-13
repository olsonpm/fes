//
// README
// - I can not think of a better name for this file.  Of course most of the
//   utilities are "data dependent" in that they provide different functionality
//   depending on the data argument passed.  This file however handles utilities
//   with the property `typeToDataDependentProps` whose functions have
//   other properties which are data-dependent.  The current two properties
//   available are `expectedServiceArgumentTypes`
//   and `transformServiceArguments`
//
// - Currently this type of utility will never be unary
//

//---------//
// Imports //
//---------//

import approveDataArgument from './approve-data-argument'
import approveServiceArguments from './approve-service-arguments'

import hasKey from '../../internal/has-own-enumerable-key'
import mTransformProperties from '../../internal/m-transform-properties'
import noop from '../../internal/noop'

import { getType } from '../../helpers'
import { throwOrReject } from './helpers'

//
//------//
// Main //
//------//

const createTypeToDataUtility = (definition, specialCaseProperties) => {
  const { isDataFirst, isFlipped } = specialCaseProperties,
    { isAsynchronous, typeToDataDependentProps } = definition

  //
  // TODO: rewrite below to handle 'isDataFirst' case more appropriately i.e. if
  //   the data argument is first then we can run validation before service
  //   arguments are passed.  The code may turn hairy as a result.
  //

  return (...firstArgs) => (...secondArgs) => {
    const [dataArgs, serviceArgs] = isDataFirst
      ? [firstArgs, secondArgs]
      : [secondArgs, firstArgs]

    //
    // need to validate data before service arguments because the service
    //   arguments depend on the data
    //
    let error = approveDataArgument(
      dataArgs,
      //
      // TODO: if approveArguments is passed in the root definition, then we
      //   should use that instead.  This is somewhat related to the above todo
      //   because we should be potentially running checks when firstArgs
      //   is passed
      //
      noop,
      definition,
      specialCaseProperties
    )
    if (error) return throwOrReject(error, isAsynchronous)

    let dataType = getType(dataArgs[0])
    if (!hasKey(dataType)(typeToDataDependentProps)) dataType = 'any'

    const {
        theFunction,
        approveArguments = definition.approveArguments,
        expectedServiceArgumentTypes = definition.expectedServiceArgumentTypes,
        transformResult = definition.transformResult,
        transformServiceArguments = definition.transformServiceArguments,
      } = typeToDataDependentProps[dataType],
      authorDefinedApproveArguments = approveArguments

    error = approveServiceArguments.dataDependent(
      serviceArgs,
      authorDefinedApproveArguments(dataArgs[0]),
      definition,
      expectedServiceArgumentTypes
    )
    if (error) return throwOrReject(error, isAsynchronous)

    // success woo woo

    if (transformServiceArguments) {
      const serviceArguments = isDataFirst ? secondArgs : firstArgs

      mTransformProperties(transformServiceArguments)(serviceArguments)
    }

    const result = isFlipped
      ? theFunction(...secondArgs)(...firstArgs)
      : theFunction(...firstArgs)(...secondArgs)

    return transformResult(result)
  }
}

//
//---------//
// Exports //
//---------//

export default createTypeToDataUtility
