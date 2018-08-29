//
// for reference
//
// contrived1(aString)(aNumber) => `${aNumber}_${aString}`.toLowerCase()
//   *where aString must equal 'A' and aNumber must equal 1
//
// contrived1(aSet)(aString) => `${aString}_${aSet.size}`.toUpperCase()
//   *where aSet.size must equal 1 and aString must equal 'a'
//
// contrived1(anArray)(aString) => `${aString}_${anArray.length}`.toLowerCase()
//   *where anArray.length must equal 1 and aString must equal 'A'
//

import contrived1Parent from './contrived1-parent'

export default {
  name: 'contrived1',
  flippedFrom: contrived1Parent,
}
