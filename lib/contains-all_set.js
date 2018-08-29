export default setOfValuesToCheckFor => aSet => {
  let allAreContained = true

  for (const value of setOfValuesToCheckFor) {
    allAreContained = aSet.has(value)
    if (!allAreContained) break
  }

  return allAreContained
}
