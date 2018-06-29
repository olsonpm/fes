//
// TODO: approve no newlines
//

import string from '../internal/truncate-to-n-chars'

export default {
  name: 'truncateToNChars',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['number'],
  typeToFunction: { string },
}
