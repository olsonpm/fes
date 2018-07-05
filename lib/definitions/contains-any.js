import {
  containsAny_arrayLike as arrayLike,
  containsAny_set,
} from '../internal'

export default {
  name: 'containsAny',
  expectedServiceArgumentTypes: [['array', 'set']],
  transformServiceArguments: [arrayOrSet => new Set(arrayOrSet)],
  typeToFunction: {
    arrayLike,
    map,
    object,
    set: containsAny_set,
  },
}

//
//-------------//
// Helper Fxns //
//-------------//

function object(setOfValuesToCheck) {
  return anObject => {
    const inThisSetOfValues = new Set(Object.values(anObject))
    return containsAny_set(setOfValuesToCheck)(inThisSetOfValues)
  }
}

function map(setOfValuesToCheck) {
  return aMap => {
    const inThisSetOfValues = new Set(aMap.values())
    return containsAny_set(setOfValuesToCheck)(inThisSetOfValues)
  }
}
