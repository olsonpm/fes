export default {
  name: 'omit',
  typeToDataDependentProps: {
    map: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: omit_map,
    },
    object: {
      expectedServiceArgumentTypes: [['number', 'string']],
      theFunction: omit_object,
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function omit_map(keyToRemove) {
  return aMap => {
    const result = new Map(aMap)
    result.delete(keyToRemove)
    return result
  }
}

function omit_object(keyToRemove) {
  return anObject => {
    const result = Object.assign({}, anObject)
    delete result[keyToRemove]
    return result
  }
}
