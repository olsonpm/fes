import string from '../internal/truncate-to-n-lines'

export default {
  name: 'truncateToNLines',
  expectedServiceArgumentTypes: ['number'],
  typeToFunction: { string },
}
