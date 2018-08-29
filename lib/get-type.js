//---------//
// Imports //
//---------//

import typeDetect from 'type-detect'

import firstCharacterToLowerCase from './first-character-to-lower-case'

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
//------------------//
// Helper Functions //
//------------------//

function getTypeToSpecialCase() {
  return {
    HTMLCollection: 'htmlCollection',
  }
}

export default getType
