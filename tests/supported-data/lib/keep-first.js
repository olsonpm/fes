export default {
  name: 'keepFirst',
  expectedSupportArgumentTypes: ['number'],
  typeToFunction: { array: keepFirst_hasSlice, string: keepFirst_hasSlice },
}

function keepFirst_hasSlice(numberToKeep) {
  return arrayOrString => arrayOrString.slice(0, numberToKeep)
}
