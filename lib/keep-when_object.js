export default filterFunction => anObject => {
  const result = {}

  for (const key of Object.keys(anObject)) {
    const value = anObject[key]
    if (filterFunction(value, key, anObject)) result[key] = value
  }

  return result
}
