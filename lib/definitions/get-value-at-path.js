//
// README
//   - I'm leaving out map and arrayLike because I have only ever needed this
//     function with nested objects.  If you find another use-case please let
//     me know so I can understand it and figure out a solution.
//

//---------//
// Imports //
//---------//

import discardLast from '../internal/discard-last_array-like'
import last from '../internal/last_array-like'

//
//------//
// Init //
//------//

const getAllButLastKey = discardLast(1)

//
//------//
// Main //
//------//

export default {
  name: 'getValueAtPath',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['array'],
  typeToFunction: {
    object: getValueAtPath_object,
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getValueAtPath_object(arrayOfKeys) {
  const allButLastKey = getAllButLastKey(arrayOfKeys),
    lastKey = last(arrayOfKeys)

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
