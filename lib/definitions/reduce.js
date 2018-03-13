import {
  reduce_arrayLike as arrayLike,
  reduce_map as map,
  reduce_object as object,
  reduce_set as set,
} from '../internal'

export default {
  name: 'reduce',
  expectedServiceArgumentTypes: ['function', 'any'],
  typeToFunction: {
    arrayLike,
    map,
    object,
    set,
  },
}
