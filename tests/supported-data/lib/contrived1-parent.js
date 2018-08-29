import contrived1Grandparent from './contrived1-grandparent'

export default {
  name: 'contrived1Parent',
  expectedSupportArgumentTypes: ['string'],
  mergeDefinitionWith: contrived1Grandparent,
  transformResult: transformResult_root,
  groupToDataDependentProps: {
    mapOrSet: {
      approveAllArguments: approveAllArguments_mapOrSet,
      theFunction: contrived1Parent_mapOrSet,
    },
  },
  typeToDataDependentProps: {
    string: {
      approveAllArguments: approveAllArguments_string,
      expectedSupportArgumentTypes: ['number'],
      theFunction: contrived1Parent_string,
    },
  },
}

function transformResult_root(aString) {
  return aString.toUpperCase()
}

function contrived1Parent_mapOrSet(aString) {
  return aMapOrSet => `${aString}_${aMapOrSet.size}`
}

function approveAllArguments_mapOrSet({ dataArg, supportArgs }) {
  if (supportArgs[0] !== 'a') {
    return new Error("support arg doesn't equal 'a'!")
  } else if (dataArg.size !== 1) {
    return new Error("data arg doesn't have a size of 1!")
  }
}

function contrived1Parent_string(aNumber) {
  return aString => `${aNumber}_${aString}`
}

function approveAllArguments_string({ dataArg, supportArgs }) {
  if (supportArgs[0] !== 1) {
    return new Error("support arg doesn't equal 1!")
  } else if (dataArg !== 'A') {
    return new Error("data arg doesn't equal 'A'!")
  }
}
