//---------//
// Imports //
//---------//

import cloneDeep from 'clone-deep'

import clone_object from './clone_object'
import getType from './get-type'
import hasKey from './has-key_object'

//
//------//
// Main //
//------//

const assignOverRecursively = {
  map: mapThatGetsAssignedOver => primaryMap => {
    const result = new Map(mapThatGetsAssignedOver)

    for (const [key, newValue] of primaryMap) {
      if (result.has(key)) {
        const existingValue = result.get(key)
        result.set(key, merge(existingValue, newValue))
      } else {
        result.set(key, newValue)
      }
    }

    return result
  },

  object: objectThatGetsAssignedOver => primaryObject => {
    const result = clone_object(objectThatGetsAssignedOver)

    for (const key of Object.keys(primaryObject)) {
      const newValue = primaryObject[key]

      if (hasKey(key)(result)) {
        const existingValue = result[key]
        result[key] = merge(existingValue, newValue)
      } else {
        result[key] = newValue
      }
    }

    return result
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
