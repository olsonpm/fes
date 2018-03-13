export default {
  name: 'all',
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
    let stillTruthy = true,
      i = 0

    while (stillTruthy && i < anArrayLike.length) {
      stillTruthy = predicate(anArrayLike[i], i, anArrayLike)
      i += 1
    }

    return stillTruthy
  }
}

function map(predicate) {
  return aMap => {
    let stillTruthy = true

    for (const [key, val] of aMap) {
      stillTruthy = predicate(val, key, aMap)
      if (!stillTruthy) break
    }

    return stillTruthy
  }
}

function object(predicate) {
  return anObject => {
    const keys = Object.keys(anObject)

    let stillTruthy = true,
      i = 0

    while (stillTruthy && i < keys.length) {
      const aKey = keys[i]
      stillTruthy = predicate(anObject[aKey], aKey, anObject)
      i += 1
    }

    return stillTruthy
  }
}

function set(predicate) {
  return aSet => {
    let stillTruthy = true

    for (const value of aSet) {
      stillTruthy = predicate(value, value, aSet)
      if (!stillTruthy) break
    }

    return stillTruthy
  }
}
