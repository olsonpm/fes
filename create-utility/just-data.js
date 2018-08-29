//---------//
// Imports //
//---------//

import approveDataArgument from './approve/data-argument'

import { getType, makeThrowOrReject } from '../lib'

//
//------//
// Main //
//------//

const createJustDataUtility = definition => {
  const {
      isAsynchronous,
      typeToDataDependentProps,
      typeToFunction,
    } = definition,
    throwOrReject = makeThrowOrReject(isAsynchronous)

  return (...args) => {
    const maybeError = approveDataArgument(args, definition)
    if (maybeError) return throwOrReject(maybeError)

    const validDataArg = args[0],
      type = getType(validDataArg)

    let theFunction, transformResult

    if (typeToDataDependentProps) {
      const dataDependentProps =
        typeToDataDependentProps[type] || typeToDataDependentProps.any

      theFunction = dataDependentProps.theFunction
      transformResult = dataDependentProps.transformResult
    } else {
      theFunction = typeToFunction[type] || typeToFunction.any
      transformResult = definition.transformResult
    }

    const result = theFunction(validDataArg)

    return isAsynchronous
      ? result.then(transformResult)
      : transformResult(result)
  }
}

//
//---------//
// Exports //
//---------//

export default createJustDataUtility
