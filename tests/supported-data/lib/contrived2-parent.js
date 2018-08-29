export default {
  name: 'contrived2Parent',
  typeToDataDependentProps: {
    string: {
      approveSupportArguments,
      expectedSupportArgumentTypes: ['number'],
      theFunction: contrived2Parent_string,
      transformSupportArguments: [increment],
    },
  },
}

function increment(aNumber) {
  return aNumber + 1
}
function contrived2Parent_string(aNumber) {
  return aString => `${aNumber}_${aString}`
}

function approveSupportArguments(aNumber) {
  if (aNumber !== 1) {
    return new Error("support arg doesn't equal 1!")
  }
}
