import clone from '../internal/clone_array'

export default {
  name: 'reverse',
  typeToFunction: { arrayLike, string },
}

//
//------------------//
// Helper Functions //
//------------------//

function arrayLike(anArrayLike) {
  return clone(anArrayLike).reverse()
}

function string(aString) {
  return aString
    .split('')
    .reverse()
    .join('')
}
