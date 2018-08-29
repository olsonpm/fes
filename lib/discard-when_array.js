export default shouldDiscard => anArray => {
  const result = []

  for (let i = 0; i < anArray.length; i += 1) {
    const value = anArray[i]
    if (!shouldDiscard(value, i, anArray)) result.push(value)
  }

  return result
}
