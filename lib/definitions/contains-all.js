import {
  containsAll_arrayLike as arrayLike,
  containsAll_set,
} from '../internal'

export default {
  name: 'containsAll',
  expectedServiceArgumentTypes: [['array', 'set']],
  transformServiceArguments: [arrayOrSet => new Set(arrayOrSet)],
  typeToFunction: {
    arrayLike,
    map,
    object,
    set: containsAll_set,
  },
}

//
//-------------//
// Helper Fxns //
//-------------//

function object(setOfValuesToCheck) {
  return anObject => {
    const inThisSetOfValues = new Set(Object.values(anObject))
    return containsAll_set(setOfValuesToCheck)(inThisSetOfValues)
  }
}

function map(setOfValuesToCheck) {
  return aMap => {
    const inThisSetOfValues = new Set(aMap.values())
    return containsAll_set(setOfValuesToCheck)(inThisSetOfValues)
  }
}
