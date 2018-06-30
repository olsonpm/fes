export default {
  name: 'mAppend',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['any'],
  typeToFunction: {
    array: mAppend,
  },
}

function mAppend(element) {
  return anArray => {
    anArray.push(element)
    return anArray
  }
}
