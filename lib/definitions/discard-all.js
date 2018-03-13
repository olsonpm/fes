//---------//
// Imports //
//---------//

import {
  createEmptyCollectionFromInstance,
  discardAll_set as set,
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
  name: 'discardAll',
  expectedServiceArgumentTypes: [['array', 'set']],
  transformServiceArguments: [arrayOrSet => new Set(arrayOrSet)],
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

function arrayLike(setOfValuesToRemove) {
  return collection =>
    reduce_arrayLike((result, value) => {
      if (!setOfValuesToRemove.has(value)) mAppend(value)(result)
      return result
    }, createEmptyCollectionFromInstance(collection))(collection)
}

function map(setOfValuesToRemove) {
  return aMap =>
    reduce_map((result, value, key) => {
      if (!setOfValuesToRemove.has(value)) result.set(key, value)
      return result
    }, new Map())(aMap)
}

function object(setOfValuesToRemove) {
  return anObject =>
    reduce_object((result, value, key) => {
      if (!setOfValuesToRemove.has(value)) result[key] = value
      return result
    }, {})(anObject)
}
