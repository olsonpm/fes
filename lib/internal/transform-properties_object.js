import reduce from './reduce_object'

export default transforms => anObject => {
  return reduce((result, value, key) => {
    const aTransform = transforms[key]
    result[key] = aTransform ? aTransform(value, key, anObject) : value
    return result
  }, {})(anObject)
}
