//---------//
// Imports //
//---------//

import approveNonDataArguments from './approve/non-data-arguments'

import { makeThrowOrReject } from '../lib'

//
//------//
// Main //
//------//

const createNoDataArgumentUtility = definition => {
  const {
      isAsynchronous,
      theFunction,
      transformArguments,
      transformResult,
    } = definition.hasNoDataArgument,
    throwOrReject = makeThrowOrReject(isAsynchronous)

  return (...args) => {
    const maybeError = approveNonDataArguments(args, definition)
    if (maybeError) return throwOrReject(maybeError)

    // no errors, we good fam

    args = transformArguments(args)

    const result = theFunction(...args)

    return isAsynchronous
      ? result.then(transformResult)
      : transformResult(result)
  }
}

//
//---------//
// Exports //
//---------//

export default createNoDataArgumentUtility
