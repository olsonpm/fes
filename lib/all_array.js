export default predicate => anArray => {
  for (let i = 0; i < anArray.length; i += 1) {
    const element = anArray[i]
    if (!predicate(element, i, anArray)) return false
  }

  return true
}
