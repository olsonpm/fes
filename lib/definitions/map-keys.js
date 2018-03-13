import { reduce_object } from '../internal'

export default {
  name: 'mapKeys',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    object,
    map,
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function object(mapperFunction) {
  return anObject =>
    reduce_object((result, value, key) => {
      const newKey = mapperFunction(key, value, anObject)
      result[newKey] = value
      return result
    }, {})(anObject)
}
function map(mapperFunction) {
  return aMap => {
    const result = new Map()
    for (const [key, value] of aMap) {
      const newKey = mapperFunction(key, value, aMap)
      result.set(newKey, value)
    }
    return result
  }
}
