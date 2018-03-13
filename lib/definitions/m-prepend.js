export default {
  name: 'mPrepend',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    array: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: mPrependArray,
    },
  },
}

function mPrependArray(prependThis) {
  return toThis => {
    toThis.unshift(prependThis)
    return toThis
  }
}
