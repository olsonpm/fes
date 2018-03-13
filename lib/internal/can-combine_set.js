import keepIntersection from './keep-intersection_set'
import { getFirstSharedKeyString } from '../helpers'

export default set1 => set2 => {
  const duplicateKeys = keepIntersection(set1)(set2)

  if (duplicateKeys.size) {
    const firstSharedKeyString = getFirstSharedKeyString(duplicateKeys)

    return new Error(
      'Unable to combine the passed sets as they have at least one shared value' +
        `first shared value found: ${firstSharedKeyString}`
    )
  }
}
