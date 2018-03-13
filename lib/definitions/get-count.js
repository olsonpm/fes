import object from '../internal/get-count_object'

export default {
  name: 'getCount',
  typeToFunction: {
    arrayLike: anArrayLike => anArrayLike.length,
    mapOrSet: aMapOrSet => aMapOrSet.size,
    object,
  },
}
