//---------//
// Imports //
//---------//

import objectInspect from 'object-inspect'
import typeDetect from 'type-detect'

import first from './internal/first_map-or-set'
import firstCharacterToLowerCase from './internal/first-character-to-lower-case'
import passThrough from './internal/pass-through'
import truncateToNChars from './internal/truncate-to-n-chars'

//
//------//
// Init //
//------//

const typeToSpecialCase = getTypeToSpecialCase()

//
//------//
// Main //
//------//

const getType = something => {
  const type = typeDetect(something)

  return typeToSpecialCase[type] || firstCharacterToLowerCase(type)
}

//
// used in 'can-combine_(map|set).js'
//
// there's no helpful way to display all the shared keys with maps and sets, so
//   let's just display the first one
//
function getFirstSharedKeyString(duplicateKeys) {
  return passThrough(duplicateKeys, [
    first,
    objectInspect,
    truncateToNChars(20),
  ])
}

//
//------------------//
// Helper Functions //
//------------------//

function getTypeToSpecialCase() {
  return {
    HTMLCollection: 'htmlCollection'
  }
}

//
//---------//
// Exports //
//---------//

export { getFirstSharedKeyString, getType }
