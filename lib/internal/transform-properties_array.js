import map from './map_array-like'

export default transforms => anArray => {
  return map((value, key) => {
    const aTransform = transforms[key]
    return aTransform ? aTransform(value, key, anArray) : value
  })(anArray)
}
