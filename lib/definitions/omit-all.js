import reduce from '../internal/reduce_object'

export default {
  name: 'omitAll',
  expectedServiceArgumentTypes: [['array', 'set']],
  transformServiceArguments: {
    0: arrayOrSet => new Set(arrayOrSet),
  },
  typeToFunction: {
    map,
    object,
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function map(setOfKeysToRemove) {
  return aMap => {
    const result = new Map()
    for (const [key, value] of aMap) {
      if (!setOfKeysToRemove.has(key)) result.set(key, value)
    }
    return result
  }
}

function object(setOfKeysToRemove) {
  return anObject =>
    reduce((result, value, key) => {
      if (!setOfKeysToRemove.has(key)) result[key] = value
      return result
    }, {})(anObject)
}
