import jstring from './jstring'
import passThrough from './pass-through'
import truncateToNLines from './truncate-to-n-lines'

export default ({ anArg, argIdx }) => {
  const argToString = passThrough(anArg, [jstring, truncateToNLines(3)])

  return `Argument ${argIdx} given: ${argToString}`
}
