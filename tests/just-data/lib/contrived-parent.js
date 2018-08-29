export default {
  name: 'contrivedParent',
  typeToDataDependentProps: {
    set: {
      approveDataArgument: approve_set,
      theFunction: join_set,
      transformResult: toLower,
    },
  },
}

function toLower(aString) {
  return aString.toLowerCase()
}

function approve_set(aSet) {
  if (!(aSet.has('A') && aSet.has('B'))) {
    return new Error("set does not contain 'A' and 'B'")
  }
}

function join_set(aSet) {
  return [...aSet].join('')
}
