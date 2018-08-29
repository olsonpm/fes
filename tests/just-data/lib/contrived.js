import contrivedParent from './contrived-parent'

export default {
  name: 'contrived',
  isAsynchronous: true,
  mergeDefinitionWith: contrivedParent,
  typeToDataDependentProps: {
    array: {
      approveDataArgument: approve_array,
      theFunction: join_array,
      transformResult: toUpper,
    },
    set: {
      theFunction: join_set,
    },
  },
}

function toUpper(aString) {
  return aString.toUpperCase()
}

function approve_array(anArray) {
  if (!(anArray[0] === 'a' && anArray[1] === 'b')) {
    return new Error("array is not ['a', 'b']!")
  }
}

function join_array(anArray) {
  return Promise.resolve(anArray.join(''))
}

function join_set(aSet) {
  return Promise.resolve([...aSet].join(''))
}
