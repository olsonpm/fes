//
// TODO: reorganize special-case consumption of approveDataArgument to better
//   handle isArrayOfData (below we pass 'noop' which should be avoidable).
//
// TODO: figure out sane way to implement
//   alongside 'create-data-dependent-utility'
//
// TODO: handle service arguments
//

//---------//
// Imports //
//---------//

import dedent from 'dedent'

import approveDataArgument from './approve-data-argument'
import discardWhen from '../../internal/discard-when_array-like'
import firstKey from '../../internal/first-key_object'
import flow from '../../internal/flow'
import hasOwnEnumerableKey from '../../internal/has-own-enumerable-key'
import isLaden from '../../internal/is-laden_has-length'
import jstring from '../../internal/jstring'
import mSet from '../../internal/m-set_object'
import noop from '../../internal/noop'
import passThrough from '../../internal/pass-through'
import reduce from '../../internal/reduce_object'
import strictlyEquals from '../../internal/strictly-equals'
import truncateToNLines from '../../internal/truncate-to-n-lines'

import { getType } from '../../helpers'
import { throwOrReject } from './helpers'

//
//------//
// Main //
//------//

const createArrayOfDataUtility = definition => {
  const {
      isAsynchronous,
      name,
      transformResult,
      typeToFunction,
    } = definition,
    throwIfCalledDirectly = createThrowIfCalledDirectly(definition)

  return reduce(toTypeSpecificUtility, throwIfCalledDirectly)(typeToFunction)

  // scoped helper functinos

  function toTypeSpecificUtility(pluralTypeToFunction, theFunction, dataType) {
    return mSet(dataType + 's', typedUtility)(pluralTypeToFunction)

    function typedUtility(...dataArgs) {
      let error =
        approveDataArgument(dataArgs, noop, definition) ||
        approveElementTypes(name, dataArgs, dataType)
      if (error) return throwOrReject(error, isAsynchronous)

      error = definition.approveArguments(dataArgs[0])
      if (getType(error) === 'error') return throwOrReject(error, isAsynchronous)

      // phew no errors.  Onward!

      const validDataArg = dataArgs[0]
      return transformResult(theFunction(validDataArg))
    }
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function createThrowIfCalledDirectly(definition) {
  const { isAsynchronous, name, typeToFunction } = definition

  return function throwIfCalledDirectly(arg) {
    const example = `${name}.${firstKey(typeToFunction)}s(...)`,
      expectedType = getType(arg) === 'array' ? getType(arg[0]) : null,
      hint = hasOwnEnumerableKey(expectedType)(typeToFunction)
        ? `Hint: you probably meant to call ${name}.${expectedType}s(...)`
        : ''

    const error = new Error(
      dedent(`
        ${name} requires you specify the type such as ${example}.

        Without specifying the type, fes can't return a reasonable value in the
        case of an empty list.

        ${hint}
      `)
    )

    return throwOrReject(error, isAsynchronous)
  }
}

function approveElementTypes(name, dataArgs, dataType) {
  const arrayOfData = dataArgs[0],
    invalidElements = discardWhen(flow([getType, strictlyEquals(dataType)]))(
      arrayOfData
    )

  if (isLaden(invalidElements)) {
    const firstInvalidElement = invalidElements[0],
      firstInvalidElementString = passThrough(firstInvalidElement, [
        jstring,
        truncateToNLines(3),
      ])
    return new Error(
      `The function '${name}.${dataType}s' was passed at least one element of an incorrect type` +
        `\nfirst invalid element type: ${getType(firstInvalidElement)}` +
        `\nfirst invalid element: ${firstInvalidElementString}`
    )
  }
}

//
//---------//
// Exports //
//---------//

export default createArrayOfDataUtility
