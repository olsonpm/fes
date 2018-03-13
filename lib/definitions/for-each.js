import { forEach_arrayLike } from '../internal'

export default {
  name: 'forEach',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    arrayLike: forEach_arrayLike,
    map,
    object,
    set,
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function map(forEach) {
  return aMap => {
    for (const [key, value] of aMap) {
      forEach(value, key, aMap)
    }
    return aMap
  }
}

function object(forEachFunction) {
  return anObject => {
    forEach_arrayLike(key => forEachFunction(anObject[key], key, anObject))(
      Object.keys(anObject)
    )
    return anObject
  }
}

function set(forEach) {
  return aSet => {
    for (const value of aSet) {
      forEach(value, value, aSet)
    }
    return aSet
  }
}
