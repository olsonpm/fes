import keepFirst from '../internal/keep-first_array-like'

export default {
  name: 'discardLastWhile',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: { arrayLike },
}

//
//-------------//
// Helper Fxns //
//-------------//

function arrayLike(predicate) {
  return anArrayLike => {
    let idx = anArrayLike.length - 1,
      keepDropping = true

    while (keepDropping && idx >= 0) {
      keepDropping = predicate(anArrayLike[idx], idx, anArrayLike)
      if (keepDropping) idx -= 1
    }

    return keepFirst(idx + 1)(anArrayLike)
  }
}
