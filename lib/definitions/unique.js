import join from '../internal/join_set'

export default {
  name: 'unique',
  typeToFunction: {
    array: anArray => [...new Set(anArray)],
    string: aString => join('')(new Set(aString)),
  },
}
