export default {
  name: 'startsWith',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    arrayLike: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: startsWith,
    },
    string: {
      expectedServiceArgumentTypes: ['string'],
      theFunction: startsWith,
    },
  },
}

//
//-------------//
// Helper Fxns //
//-------------//

function startsWith(mightStartWith_arrayLike) {
  return anArrayLike => {
    if (mightStartWith_arrayLike.length > anArrayLike.length) return false

    for (let i = 0; i < mightStartWith_arrayLike.length; i += 1) {
      if (mightStartWith_arrayLike[i] !== anArrayLike[i]) return false
    }

    return true
  }
}
