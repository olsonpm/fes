import { mMap_arrayLike, mMap_object } from '../internal'

export default {
  name: 'mMap',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    array: mMap_arrayLike,
    arguments: mMap_arrayLike,
    object: mMap_object,
    map,
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function map(mapperFunction) {
  return aMap => {
    for (const [key, value] of aMap) {
      aMap.set(key, mapperFunction(value, key, aMap))
    }
    return aMap
  }
}
