//
// implementation thanks to Jon Schlinkert
//
/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

export default numberOfTimes => stringToRepeat => {
  // cover common, quick use cases
  if (numberOfTimes === 1) return stringToRepeat
  if (numberOfTimes === 2) return stringToRepeat + stringToRepeat

  const max = stringToRepeat.length * numberOfTimes
  let result = ''

  while (max > result.length && numberOfTimes > 1) {
    if (numberOfTimes & 1) {
      result += stringToRepeat
    }

    numberOfTimes >>= 1
    stringToRepeat += stringToRepeat
  }

  result += stringToRepeat
  result = result.substr(0, max)

  return result
}
