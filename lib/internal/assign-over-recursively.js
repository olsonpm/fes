//---------//
// Imports //
//---------//

import cloneDeep from 'clone-deep'

import cloneObject from './clone_object'
import mSet_map from './m-set_map'
import mSet_object from './m-set_object'
import reduce_map from './reduce_map'
import reduce_object from './reduce_object'

import { getType } from '../helpers'

//
//------//
// Main //
//------//

const assignOverRecursively = {
  map: mapThatGetsAssignedOver => {
    return reduce_map((result, newValue, key) => {
      const existingValue = result.get(key)
      return mSet_map(key, merge(existingValue, newValue))(result)
    }, new Map(mapThatGetsAssignedOver))
  },

  object: objectThatGetsAssignedOver => {
    return reduce_object((result, newValue, key) => {
      const existingValue = result[key]
      return mSet_object(key, merge(existingValue, newValue))(result)
    }, cloneObject(objectThatGetsAssignedOver))
  },
}

//
// this has to be declared after `assignOverRecursively` because it utilizes
//   that structure
//
const typeToAssignRecursively = getTypeToAssignRecursively()

//
//------------------//
// Helper Functions //
//------------------//

function merge(existingValue, newValue) {
  const existingValueType = getType(existingValue),
    newValueType = getType(newValue)

  const mergeFunction =
    existingValueType === newValueType
      ? typeToAssignRecursively[newValueType] || overwriteWithDeepClone
      : overwriteWithDeepClone

  return mergeFunction(existingValue)(newValue)
}

function overwriteWithDeepClone(_unusedExistingValue) {
  return newValue => cloneDeep(newValue)
}

function cloneAndMergeSets(firstSet) {
  return secondSet => {
    const cloneOfFirstSet = cloneDeep(firstSet),
      cloneOfSecondSet = cloneDeep(secondSet)

    return new Set([...cloneOfFirstSet, ...cloneOfSecondSet])
  }
}

function getTypeToAssignRecursively() {
  return {
    map: assignOverRecursively.map,
    object: assignOverRecursively.object,
    set: cloneAndMergeSets,
  }
}

//
//---------//
// Exports //
//---------//

export default assignOverRecursively
