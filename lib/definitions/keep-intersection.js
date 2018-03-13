//
// README
//   - I'm writing this initially to support array and set only.  It might make
//     sense to expand it to key/value collections but I'm going to wait until
//     I encounter a use-case before implementing that.
//

import { keepIntersection_array, keepIntersection_set } from '../internal'

export default {
  name: 'keep',
  typeToDataDependentProps: {
    array: {
      expectedServiceArgumentTypes: ['array'],
      theFunction: keepIntersection_array,
    },
    set: {
      expectedServiceArgumentTypes: ['set'],
      theFunction: keepIntersection_set,
    },
  },
}
