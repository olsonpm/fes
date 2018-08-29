//
// for reference
//
// contrived2(aString)(anArray) => `${aString.toUpperCase()}_${anArray.length}`
//   *where aString must equal 'a'
//
// contrived2(aNumber)(aString) => `${aNumber + 1}_${aString}`
//   *where aNumber must equal 1
//

import contrived2Parent from './contrived2-parent'

export default {
  name: 'contrived2',
  expectedSupportArgumentTypes: ['string'],
  mergeDefinitionWith: contrived2Parent,
  transformSupportArguments: [toUpper],
  groupToDataDependentProps: {
    arrayLike: {
      approveSupportArguments,
      theFunction: contrived2_arrayLike,
    },
  },
}

function toUpper(aString) {
  return aString.toUpperCase()
}
function contrived2_arrayLike(aString) {
  return anArrayLike => `${aString}_${anArrayLike.length}`
}

function approveSupportArguments(aString) {
  if (aString !== 'a') {
    return new Error("support arg doesn't equal 'a'!")
  }
}
