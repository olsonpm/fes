export default shouldDiscard => anObject => {
  const result = {},
    theKeys = Object.keys(anObject)

  for (let i = 0; i < theKeys.length; i += 1) {
    const key = theKeys[i],
      value = anObject[key]

    if (!shouldDiscard(value, key, anObject)) result[key] = value
  }

  return result
}
