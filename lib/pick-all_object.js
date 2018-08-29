import reduce from './reduce_object'

export default arrayOfKeysToPick => anObject => {
  const setOfKeysToPick = new Set(arrayOfKeysToPick)

  return reduce((result, value, key) => {
    if (setOfKeysToPick.has(key)) result[key] = value
    return result
  }, {})(anObject)
}
