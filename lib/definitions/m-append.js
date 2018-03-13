export default {
  name: 'mAppend',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['any'],
  typeToFunction: {
    array: mAppend,
  },
}

function mAppend(appendThis) {
  return toThis => {
    toThis.push(appendThis)
    return toThis
  }
}
