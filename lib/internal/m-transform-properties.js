import hasKey from './has-key_object'
import reduce from './reduce_object'

export default transforms => anObject => {
  return reduce((result, aTransform, key) => {
    if (hasKey(key)(anObject))
      result[key] = aTransform(anObject[key], key, anObject)
    return result
  }, anObject)(transforms)
}
