import reduce from './reduce_object'

export default mapFunction => object => {
  return reduce((result, value, key) => {
    result[key] = mapFunction(value, key, object)
    return result
  }, object)(object)
}
