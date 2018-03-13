//---------//
// Imports //
//---------//

import {
  createEmptyCollectionFromInstance,
  mAppend_arrayLike as mAppend,
  reduce_arrayLike,
  reduce_map,
  reduce_object,
} from '../internal'

//
//------//
// Main //
//------//

export default {
  name: 'keep',
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

function arrayLike(valueToKeep) {
  return anArrayLike =>
    reduce_arrayLike((result, value) => {
      if (value === valueToKeep) result = mAppend(value)(result)
      return result
    }, createEmptyCollectionFromInstance(anArrayLike))(anArrayLike)
}

function map(valueToKeep) {
  return aMap =>
    reduce_map((result, value, key) => {
      if (value === valueToKeep) result.set(key, value)
      return result
    }, new Map())(aMap)
}

function object(valueToKeep) {
  return anObject =>
    reduce_object((result, value, key) => {
      if (value === valueToKeep) result[key] = value
      return result
    }, {})(anObject)
}

function set(valueToKeep) {
  return aSet => {
    return aSet.has(valueToKeep) ? new Set([valueToKeep]) : new Set()
  }
}
