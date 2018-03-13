import { containsAll_set } from '../internal'

export default {
  name: 'containsOnly',
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
//-------------//
// Helper Fxns //
//-------------//

function arrayLike(setOfValuesToCheck) {
  return anArrayLike => {
    const inThisSetOfValues = new Set(anArrayLike)
    return containsOnly(setOfValuesToCheck, inThisSetOfValues)
  }
}

function object(setOfValuesToCheck) {
  return anObject => {
    const inThisSetOfValues = new Set(Object.values(anObject))
    return containsOnly(setOfValuesToCheck, inThisSetOfValues)
  }
}

function map(setOfValuesToCheck) {
  return aMap => {
    const inThisSetOfValues = new Set(aMap.values())
    return containsOnly(setOfValuesToCheck, inThisSetOfValues)
  }
}

function set(setOfValuesToCheck) {
  return aSet => containsOnly(setOfValuesToCheck, aSet)
}

function containsOnly(set1, set2) {
  return containsAll_set(set1)(set2) && set1.size === set2.size
}
