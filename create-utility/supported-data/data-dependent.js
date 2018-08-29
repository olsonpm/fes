//
// TODO: clean up this code.  There must be a better approach
//

//---------//
// Imports //
//---------//

import approve from '../approve'

import { getType, makeThrowOrReject } from '../../lib'

//
//------//
// Main //
//------//

const createDataDependentUtility = definition => {
  const { isAsynchronous, isFlipped, typeToDataDependentProps } = definition,
    throwOrReject = makeThrowOrReject(isAsynchronous)

  const isDataFirst = isFlipped

  let maybeError, type

  return (...firstArgs) => {
    if (isDataFirst) {
      maybeError = approve.dataArgument(firstArgs, definition)
      if (maybeError) throw maybeError

      type = getType(firstArgs[0])
    }

    //
    // we always have to approve the data argument prior to support arguments
    //   because otherwise we may trigger an incorrect support argument
    //   approval function.  This makes the code a little awkward, especially
    //   because we only want to transform and validate the support arguments
    //   once for flipped utilities
    //
    let validSupportArguments

    return (...secondArgs) => {
      if (isDataFirst) {
        maybeError = approve.nonDataArguments(secondArgs, definition, type)
      } else {
        maybeError = approve.dataArgument(secondArgs, definition)
        if (maybeError) return throwOrReject(maybeError)
        else type = getType(secondArgs[0])

        if (!validSupportArguments) {
          maybeError = approve.nonDataArguments(firstArgs, definition, type)
        }
      }

      if (maybeError) return throwOrReject(maybeError)

      const dataArg = isDataFirst ? firstArgs[0] : secondArgs[0],
        supportArgs = isDataFirst ? secondArgs : firstArgs,
        dataDependentProps =
          typeToDataDependentProps[type] || typeToDataDependentProps.any,
        {
          approveAllArguments,
          transformResult,
          transformSupportArguments,
        } = dataDependentProps

      maybeError = approveAllArguments({ dataArg, supportArgs })
      if (maybeError) return throwOrReject(maybeError)

      secondArgs = isDataFirst
        ? transformSupportArguments(secondArgs)
        : secondArgs

      if (!isDataFirst) {
        validSupportArguments =
          validSupportArguments || transformSupportArguments(firstArgs)

        firstArgs = validSupportArguments
      }

      const { theFunction } = dataDependentProps,
        result = isFlipped
          ? theFunction(...secondArgs)(...firstArgs)
          : theFunction(...firstArgs)(...secondArgs)

      return isAsynchronous
        ? result.then(transformResult)
        : transformResult(result)
    }
  }
}

//
//---------//
// Exports //
//---------//

export default createDataDependentUtility
