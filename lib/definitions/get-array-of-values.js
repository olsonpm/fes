import set from '../internal/get-array-of-values_set'

export default {
  name: 'getArrayOfValues',
  typeToFunction: {
    map: aMap => [...aMap.values()],
    object: Object.values,
    set,
  },
}
