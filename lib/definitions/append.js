export default {
  name: 'append',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    array: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: appendArray,
    },
    string: {
      expectedServiceArgumentTypes: ['string'],
      theFunction: appendString,
    },
  },
}

function appendArray(appendThis) {
  appendThis = [appendThis]
  return toThisArray => toThisArray.concat(appendThis)
}

function appendString(appendThisString) {
  return toThisString => toThisString + appendThisString
}
