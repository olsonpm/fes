export default setOfValuesToCheckFor => aSet => {
  let anyAreContained = false

  for (const value of setOfValuesToCheckFor) {
    anyAreContained = aSet.has(value)
    if (anyAreContained) break
  }

  return anyAreContained
}
