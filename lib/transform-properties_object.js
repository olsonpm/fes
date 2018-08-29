export default transforms => anObject => {
  const result = {}

  for (const key of Object.keys(anObject)) {
    const value = anObject[key]
    result[key] = transforms[key]
      ? transforms[key](value, key, anObject)
      : value
  }

  return result
}
