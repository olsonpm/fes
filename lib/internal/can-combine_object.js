//---------//
// Imports //
//---------//

import getArrayOfValues from './get-array-of-values_set'
import join from './join_array-like'
import keepFirst from './keep-first_array-like'
import keepIntersection from './keep-intersection_set'
import map from './map_array-like'
import mAppend from './m-append_array-like'
import passThrough from './pass-through'
import setOfKeys from './set-of-keys_object'
import truncateToNChars from './truncate-to-n-chars'

//
//------//
// Main //
//------//

export default object1 => object2 => {
  const setOfObject1Keys = setOfKeys(object1),
    setOfObject2Keys = setOfKeys(object2),
    duplicateKeys = keepIntersection(setOfObject1Keys)(setOfObject2Keys)

  if (duplicateKeys.size) {
    const [s, aKeyOrKeys] =
        duplicateKeys.size === 1 ? ['', 'a key'] : ['s', 'keys'],
      numberOfKeysToShow = 3,
      numberOfKeysNotShown = duplicateKeys.size - numberOfKeysToShow,
      sharedKeysString = passThrough(duplicateKeys, [
        getArrayOfValues,
        keepFirst(numberOfKeysToShow),
        map(truncateToNChars(8)),
        keys => {
          return numberOfKeysNotShown > 0
            ? mAppend(`...(${numberOfKeysNotShown} more)`)(keys)
            : keys
        },
        join(', '),
      ])

    return new Error(
      `Unable to combine the passed objects as they share ${aKeyOrKeys}` +
        `\nkey${s} shared: ${sharedKeysString}`
    )
  }
}
