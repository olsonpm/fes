import keepIntersection from './keep-intersection_set'
import setOfKeys from './set-of-keys_map'
import { getFirstSharedKeyString } from '../helpers'

export default map1 => map2 => {
  const setOfMap1Keys = setOfKeys(map1),
    setOfMap2Keys = setOfKeys(map2),
    duplicateKeys = keepIntersection(setOfMap1Keys)(setOfMap2Keys)

  if (duplicateKeys.size) {
    const firstSharedKeyString = getFirstSharedKeyString(duplicateKeys)

    return new Error(
      'Unable to combine the passed maps as they have at least one shared key' +
        `first shared key found: ${firstSharedKeyString}`
    )
  }
}
