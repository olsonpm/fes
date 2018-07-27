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
  name: 'keepAll',
  expectedServiceArgumentTypes: [['array', 'set', 'string']],
  transformServiceArguments: [arraySetOrString => new Set(arraySetOrString)],
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

function arrayLike(setOfValuesToKeep) {
  return anArrayLike =>
    reduce_arrayLike((result, value) => {
      if (setOfValuesToKeep.has(value)) result = mAppend(value)(result)
      return result
    }, createEmptyCollectionFromInstance(anArrayLike))(anArrayLike)
}

function map(setOfValuesToKeep) {
  return aMap =>
    reduce_map((result, value, key) => {
      if (setOfValuesToKeep.has(value)) result.set(key, value)
      return result
    }, new Map())(aMap)
}

function object(setOfValuesToKeep) {
  return anObject =>
    reduce_object((result, value, key) => {
      if (setOfValuesToKeep.has(value)) result[key] = value
      return result
    }, {})(anObject)
}

function set(setOfValuesToKeep) {
  return aSet => {
    const result = new Set()
    for (const value of aSet) {
      if (setOfValuesToKeep.has(value)) result.add(value)
    }
    return result
  }
}
