import { EOL } from 'os'
import getFirstNLines from './get-first-n-lines'

export default numberOfLines => aString => {
  const { lines, moreLinesExist } = getFirstNLines(numberOfLines)(aString)
  if (moreLinesExist) lines.push('...')

  return lines.join(EOL)
}
