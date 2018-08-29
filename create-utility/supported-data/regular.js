//---------//
// Imports //
//---------//

import approve from '../approve'

import { getType, makeThrowOrReject } from '../../lib'

//
//------//
// Main //
//------//

const createRegularUtility = definition => {
  const {
      approveAllArguments,
      isAsynchronous,
      isFlipped,
      transformResult,
      transformSupportArguments,
      typeToFunction,
    } = definition,
    throwOrReject = makeThrowOrReject(isAsynchronous)

  const isDataFirst = isFlipped,
    [approveFirstArgs, approveSecondArgs] = isFlipped
      ? [approve.dataArgument, approve.nonDataArguments]
      : [approve.nonDataArguments, approve.dataArgument]

  return (...firstArgs) => {
    let maybeError = approveFirstArgs(firstArgs, definition)
    if (maybeError) throw maybeError

    firstArgs = isDataFirst ? firstArgs : transformSupportArguments(firstArgs)

    return (...secondArgs) => {
      maybeError = approveSecondArgs(secondArgs, definition)
      if (maybeError) return throwOrReject(maybeError)

      const [dataArg, supportArgs] = isDataFirst
        ? [firstArgs[0], secondArgs]
        : [secondArgs[0], firstArgs]

      maybeError = approveAllArguments({ dataArg, supportArgs })
      if (maybeError) return throwOrReject(maybeError)

      const type = getType(dataArg)

      secondArgs = isDataFirst
        ? transformSupportArguments(secondArgs)
        : secondArgs

      const theFunction = typeToFunction[type] || typeToFunction.any,
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

export default createRegularUtility
