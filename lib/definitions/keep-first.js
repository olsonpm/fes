import arrayLike from '../internal/keep-first_array-like'
import string from '../internal/keep-first_string'

export default {
  name: 'keepFirst',
  expectedServiceArgumentTypes: ['number'],
  typeToFunction: { arrayLike, string },
}
