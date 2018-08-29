export default mapFunction => anArray => {
  for (let i = 0; i < anArray.length; i += 1) {
    anArray[i] = mapFunction(anArray[i], i, anArray)
  }
  return anArray
}
