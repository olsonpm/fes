import discardFirst from '../internal/discard-first_array-like'

export default {
  name: 'discardFirstWhile',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: { arrayLike },
}

//
//-------------//
// Helper Fxns //
//-------------//

function arrayLike(predicate) {
  return anArrayLike => {
    let i = 0,
      keepDropping = true

    while (keepDropping && i < anArrayLike.length) {
      keepDropping = predicate(anArrayLike[i], i, anArrayLike)
      if (keepDropping) i += 1
    }

    return discardFirst(i)(anArrayLike)
  }
}
