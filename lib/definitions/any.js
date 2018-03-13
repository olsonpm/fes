export default {
  name: 'any',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: {
    arrayLike,
    map,
    object,
    set,
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function arrayLike(predicate) {
  return anArrayLike => {
    for (let i = 0; i < anArrayLike.length; i += 1) {
      if (predicate(anArrayLike[i], i, anArrayLike)) return true
    }

    return false
  }
}

function object(predicate) {
  return anObject => {
    const keys = Object.keys(anObject)

    for (const aKey of keys) {
      if (predicate(anObject[aKey], aKey, anObject)) return true
    }

    return false
  }
}

function map(predicate) {
  return aMap => {
    for (const [key, val] of aMap) {
      if (predicate(val, key, aMap)) return true
    }

    return false
  }
}

function set(predicate) {
  return aSet => {
    for (const val of aSet) {
      if (predicate(val, val, aSet)) return true
    }

    return false
  }
}
