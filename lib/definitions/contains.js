import { contains_string } from '../internal'

export default {
  name: 'contains',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['any'],
  typeToDataDependentProps: {
    arrayLike: { theFunction: arrayLike },
    map: { theFunction: map },
    object: { theFunction: object },
    set: { theFunction: set },
    string: {
      expectedServiceArgumentTypes: ['string'],
      theFunction: contains_string,
    },
  },
}

//
//-------------//
// Helper Fxns //
//-------------//

function arrayLike(element) {
  return anArrayLike =>
    Array.prototype.indexOf.call(anArrayLike, element) !== -1
}

function object(valueToSearchFor) {
  return anObject => Object.values(anObject).indexOf(valueToSearchFor) !== -1
}

function map(valueToSearchFor) {
  return aMap => {
    let found = false

    for (const aValue of aMap.values()) {
      found = valueToSearchFor === aValue
      if (found) break
    }

    return found
  }
}

function set(valueToSearchFor) {
  return aSet => aSet.has(valueToSearchFor)
}
