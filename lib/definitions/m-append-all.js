export default {
  name: 'mAppendAll',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['array'],
  typeToFunction: {
    array: mAppendAll,
  },
}

function mAppendAll(appendThese) {
  return toThis => {
    Array.prototype.push.apply(toThis, appendThese)
    return toThis
  }
}
