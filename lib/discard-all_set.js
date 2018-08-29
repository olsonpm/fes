export default arrayOrSetOfValuesToRemove => aSet => {
  const result = new Set(),
    setOfValuesToRemove = new Set(arrayOrSetOfValuesToRemove)

  for (const value of aSet) {
    if (!setOfValuesToRemove.has(value)) result.add(value)
  }

  return result
}
