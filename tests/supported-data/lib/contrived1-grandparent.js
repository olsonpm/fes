export default {
  name: 'contrived1Grandparent',
  groupToDataDependentProps: {
    arrayLike: {
      theFunction: contrivedGrandparent_arrayLike,
      approveAllArguments,
      transformResult,
    },
  },
}

function transformResult(result) {
  return result.toLowerCase()
}

function contrivedGrandparent_arrayLike(aString) {
  return anArrayLike => `${aString}_${anArrayLike.length}`
}

function approveAllArguments({ dataArg, supportArgs }) {
  if (supportArgs[0] !== 'A') {
    return new Error("support arg doesn't equal 'A'!")
  } else if (dataArg.length !== 1) {
    return new Error("data arg doesn't have a length of 1!")
  }
}
