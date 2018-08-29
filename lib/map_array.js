export default mapFunction => anArray => {
  const result = []

  for (let i = 0; i < anArray.length; i += 1) {
    result.push(mapFunction(anArray[i], i, anArray))
  }

  return result
}
