import arrayLike from '../internal/discard-last_array-like'

export default {
  name: 'discardFirst',
  expectedServiceArgumentTypes: ['number'],
  typeToFunction: { arrayLike },
}
