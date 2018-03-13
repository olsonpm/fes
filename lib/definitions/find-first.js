export default {
  name: 'findFirst',
  expectedServiceArgumentTypes: ['any'],
  typeToFunction: {
    arrayLike,
    map,
    set,
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function arrayLike(valueToFind) {
  return anArrayLike => {
    for (const value of anArrayLike) {
      if (value === valueToFind) return value
    }
  }
}

function map(valueToFind) {
  return aMap => {
    for (const [_unused_key, value] of aMap) {
      if (value === valueToFind) return value
    }
  }
}

function set(valueToFind) {
  return aSet => {
    return aSet.has(valueToFind) ? valueToFind : undefined
  }
}
