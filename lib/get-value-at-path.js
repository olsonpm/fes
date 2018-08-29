//---------//
// Imports //
//---------//

import discardLast from './discard-last_array'
import getLastValue from './get-last-value_has-length'

//
//------//
// Init //
//------//

const keepAllButLast = discardLast(1)

//
//------//
// Main //
//------//

const getValueAtPath = arrayOfKeys => {
  const allButLastKey = keepAllButLast(arrayOfKeys),
    lastKey = getLastValue(arrayOfKeys)

  return anObject => {
    for (const key of allButLastKey) {
      if (anObject[key] === null || typeof anObject[key] !== 'object') {
        return
      }

      anObject = anObject[key]
    }
    return anObject[lastKey]
  }
}

//
//---------//
// Exports //
//---------//

export default getValueAtPath
