//
// README:
//   - currently array-of-data utilities only take a data arument (no support
//     arguments).  I need to find a use-case where support arguments make sense
//     before I'll introduce the functionality.
//
// TODO: throw if 'any' type is defined
//

//---------//
// Imports //
//---------//

import tedent from 'tedent'

import approveDataArgument from './approve/data-argument'

import {
  getType,
  getValueAt,
  makeThrowOrReject,
  map_object as map,
  mSet_object as mSet,
  reduce_object as reduce,
} from '../lib'

//
//------//
// Main //
//------//

const createArrayOfDataUtility = definition => {
  const { isAsynchronous, typeToDataDependentProps } = definition,
    throwOrReject = makeThrowOrReject(isAsynchronous)

  const typeToFunction = typeToDataDependentProps
    ? map(getValueAt('theFunction'))(typeToDataDependentProps)
    : definition.typeToFunction

  const throwIfCalledDirectly = createThrowIfCalledDirectly(
    definition,
    typeToFunction
  )

  return reduce(toTypeSpecificUtility, throwIfCalledDirectly)(typeToFunction)

  // scoped helper functinos

  function toTypeSpecificUtility(pluralTypeToFunction, theFunction, type) {
    return mSet(type + 's', typedUtility)(pluralTypeToFunction)

    function typedUtility(...dataArgs) {
      const maybeError = approveDataArgument(dataArgs, definition, {
        arrayOfDataType: type,
      })
      if (maybeError) return throwOrReject(maybeError)

      // phew no errors.  Onward!

      const { transformResult } = typeToDataDependentProps
          ? typeToDataDependentProps[type]
          : definition,
        validDataArg = dataArgs[0],
        result = theFunction(validDataArg)

      return isAsynchronous
        ? result.then(transformResult)
        : transformResult(result)
    }
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function getFirstSortedKey(anObject) {
  return Object.keys(anObject).sort()[0]
}

function createThrowIfCalledDirectly(definition, typeToFunction) {
  const { isAsynchronous, name } = definition,
    throwOrReject = makeThrowOrReject(isAsynchronous)

  return function throwIfCalledDirectly(arg) {
    const example = `${name}.${getFirstSortedKey(typeToFunction)}s(...)`,
      expectedType = getType(arg) === 'array' ? getType(arg[0]) : null,
      hint = typeToFunction[expectedType]
        ? `Hint: you probably meant to call '${name}.${expectedType}s(...)'`
        : ''

    const error = new Error(
      tedent(`
        '${name}' requires you specify the type such as '${example}'.

        Without specifying the type, fes can't return a reasonable value in the
        case of an empty list.

        ${hint}
      `)
    )

    return throwOrReject(error)
  }
}

//
//---------//
// Exports //
//---------//

export default createArrayOfDataUtility
