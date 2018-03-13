import { join_arrayLike as arrayLike, join_set as set } from '../internal'

export default {
  name: 'join',
  expectedServiceArgumentTypes: ['string'],
  typeToFunction: {
    arguments: arrayLike,
    array: arrayLike,
    set,
  },
}
