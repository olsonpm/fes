import reduce from '../internal/reduce_object'

export default {
  name: 'pickAll',
  shouldThrowOnExtraDataArguments: false,
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

function map(setOfKeysToPick) {
  return aMap => {
    const result = new Map()
    for (const [key, value] of aMap) {
      if (setOfKeysToPick.has(key)) result.set(key, value)
    }
    return result
  }
}

function object(setOfKeysToPick) {
  return anObject =>
    reduce((result, value, key) => {
      if (setOfKeysToPick.has(key)) result[key] = value
      return result
    }, {})(anObject)
}
