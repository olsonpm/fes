export default mapFunction => anObject => {
  Object.keys(anObject).forEach(key => {
    anObject[key] = mapFunction(anObject[key], key, anObject)
  })

  return anObject
}
