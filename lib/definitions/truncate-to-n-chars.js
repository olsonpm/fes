//
// TODO: approve no newlines
//

import string from '../internal/truncate-to-n-chars'

export default {
  name: 'truncateToNLines',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['number'],
  typeToFunction: { string },
}
