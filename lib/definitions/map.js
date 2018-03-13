import { map_arrayLike as arrayLike, map_object as object } from '../internal'

export default {
  name: 'map',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    arrayLike,
    object,
    map,
    set,
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function map(mapperFunction) {
  return aMap => {
    const result = new Map()

    for (const [key, value] of aMap) {
      result.set(key, mapperFunction(value, key, aMap))
    }

    return result
  }
}

function set(mapperFunction) {
  return aSet => {
    const result = new Set()

    for (const value of aSet) {
      result.add(mapperFunction(value, value, aSet))
    }

    return result
  }
}
