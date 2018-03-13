import arrayLike from '../internal/find-first-when_array-like'

export default {
  name: 'findFirstWhen',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    arrayLike,
    map,
    set,
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function map(predicate) {
  return aMap => {
    for (const [key, value] of aMap) {
      if (predicate(value, key, aMap)) return value
    }
  }
}

function set(predicate) {
  return aSet => {
    for (const value of aSet) {
      if (predicate(value, value, aSet)) return value
    }
  }
}
