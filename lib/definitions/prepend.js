export default {
  name: 'prepend',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    array: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: prependArray,
    },
    string: {
      expectedServiceArgumentTypes: ['string'],
      theFunction: prependString,
    },
  },
}

function prependArray(prependThis) {
  prependThis = [prependThis]
  return toThis => prependThis.concat(toThis)
}

function prependString(prependThis) {
  return toThis => prependThis + toThis
}
