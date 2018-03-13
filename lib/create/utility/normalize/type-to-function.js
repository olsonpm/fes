//
// TODO: move this file to a higher scope as other files utilize it
//

//---------//
// Imports //
//---------//

import clone from '../../../internal/clone_object'
import reduce from '../../../internal/reduce_set'

import { setIfNotDefined, setOfTypedArrays } from '../helpers'

//
//------//
// Init //
//------//

const { assign } = Object

//
//------//
// Main //
//------//

export default function normalizeTypeToFunction(typeToFunction) {
  const { arrayLike, mapOrSet, object } = typeToFunction
  let normalized = clone(typeToFunction)

  if (arrayLike) {
    normalized = assign(
      {
        allArrays: arrayLike,
        arguments: arrayLike,
        string: arrayLike,
        htmlCollection: arrayLike,
      },
      normalized
    )

    delete normalized.arrayLike
  }

  if (mapOrSet) {
    assign(normalized, {
      map: mapOrSet,
      set: mapOrSet,
    })

    delete normalized.mapOrSet
  }

  // this must happen before the 'untypedArray' check, because otherwise typed
  //   arrays will be added when they shouldn't be
  normalizeArrays(normalized)

  if (!normalized.function && object) {
    normalized.function = object
  }
  if (!normalized.error && object) {
    normalized.error = object
  }

  return normalized
}

function normalizeArrays(normalized) {
  if (!normalized.allArrays && !normalized.typedArray) return normalized
  if (normalized.allArrays && normalized.typedArray) {
    throw new Error(
      'You cannot declare allArrays and typedArray' +
        `\nutility name: ${normalized.name}`
    )
  }

  let arrayFunction
  if (normalized.allArrays) {
    arrayFunction = normalized.array = normalized.allArrays
    delete normalized.allArrays
  } else {
    arrayFunction = normalized.typedArray
    delete normalized.typedArray
  }

  return reduce(
    (result, aTypedArray) =>
      setIfNotDefined(result, aTypedArray, arrayFunction),
    normalized
  )(setOfTypedArrays)
}
