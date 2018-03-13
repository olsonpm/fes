import arrayLike from '../internal/discard-first_array-like'
import string from '../internal/discard-first_string'

export default {
  name: 'discardFirst',
  expectedServiceArgumentTypes: ['number'],
  typeToFunction: { arrayLike, string },
}
