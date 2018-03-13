//---------//
// Imports //
//---------//

import {
  createEmptyCollectionFromInstance,
  mAppend_arrayLike as mAppend,
  reduce_arrayLike,
  reduce_object,
} from '../internal'

//
//------//
// Main //
//------//

export default {
  name: 'discard',
  expectedServiceArgumentTypes: ['any'],
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

function arrayLike(valueToRemove) {
  return anArrayLike =>
    reduce_arrayLike((result, value) => {
      if (value !== valueToRemove) mAppend(value)(result)
      return result
    }, createEmptyCollectionFromInstance(anArrayLike))(anArrayLike)
}

function map(valueToRemove) {
  return aMap => {
    const result = new Map()
    for (const [key, value] of aMap) {
      if (value !== valueToRemove) result.set(key, value)
    }
    return result
  }
}

function object(valueToRemove) {
  return anObject =>
    reduce_object((result, value, key) => {
      if (value !== valueToRemove) result[key] = value
      return result
    }, {})(anObject)
}

function set(valueToRemove) {
  return aSet => {
    const result = new Set(aSet)
    result.delete(valueToRemove)
    return result
  }
}
