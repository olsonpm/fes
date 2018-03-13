import contains from './contains_string'
import truncateToNLines from './truncate-to-n-lines'

const hasNewline = contains('\n')

export default numberOfCharacters => aString => {
  if (hasNewline(aString)) {
    throw new Error(
      "You can't call 'truncate-to-n-chars' on a multi-line string" +
        `\nstring passed: ${truncateToNLines(2)(aString)}`
    )
  }

  if (aString.length > numberOfCharacters) {
    aString = aString.slice(0, numberOfCharacters) + '...'
  }

  return aString
}
