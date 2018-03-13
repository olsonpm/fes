import forEach from './for-each_array-like'

export default mapFunction => object => {
  const result = {}

  forEach(key => {
    result[key] = mapFunction(object[key], key, object)
  })(Object.keys(object))

  return result
}
