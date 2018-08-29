export default mapFunction => object => {
  const result = {}

  Object.keys(object).forEach(key => {
    result[key] = mapFunction(object[key], key, object)
  })

  return result
}
