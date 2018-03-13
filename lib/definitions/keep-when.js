import {
  reduce_arrayLike,
  reduce_map,
  reduce_object,
  reduce_set,
} from '../internal'

export default {
  name: 'keepWhen',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    arrayLike,
    map,
    object,
    set,
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function arrayLike(predicate) {
  return anArrayLike =>
    reduce_arrayLike((result, value, index) => {
      if (predicate(value, index, anArrayLike)) result.push(value)
      return result
    }, [])(anArrayLike)
}

function map(predicate) {
  return aMap =>
    reduce_map((result, value, key) => {
      if (predicate(value, key, aMap)) result.set(key, value)
      return result
    }, new Map())(aMap)
}

function object(predicate) {
  return anObject =>
    reduce_object((result, value, key) => {
      if (predicate(value, key, anObject)) result[key] = value
      return result
    }, {})(anObject)
}

function set(predicate) {
  return aSet =>
    reduce_set((result, value) => {
      if (predicate(value, value, aSet)) result.add(value)
      return result
    }, new Set())(aSet)
}
