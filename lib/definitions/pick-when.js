import reduce_object from '../internal/reduce_object'

export default {
  name: 'pickWhen',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    map,
    object,
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function map(predicate) {
  return aMap => {
    const result = new Map()
    for (const [key, value] of aMap) {
      if (predicate(key, value, aMap)) result.set(key, value)
    }
    return result
  }
}

function object(predicate) {
  return anObject =>
    reduce_object((result, value, key) => {
      if (predicate(key, value, anObject)) result[key] = value
      return result
    }, {})(anObject)
}
