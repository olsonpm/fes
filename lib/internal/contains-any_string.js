import contains from './contains_string'

export default setOfStringsToCheckFor => inThisString => {
  let result = false

  for (const possibleSubString of setOfStringsToCheckFor) {
    if (contains(possibleSubString)(inThisString)) {
      result = true
      break
    }
  }

  return result
}
