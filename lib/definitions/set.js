export default {
  name: 'set',
  typeToDataDependentProps: {
    object: {
      expectedServiceArgumentTypes: [['number', 'string'], 'any'],
      theFunction: set_object,
    },
    map: {
      expectedServiceArgumentTypes: ['any', 'any'],
      theFunction: set_map,
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function set_map(key, value) {
  return aMap => {
    const result = new Map(aMap)
    result.set(key, value)
    return result
  }
}

function set_object(key, value) {
  return anObject => {
    const result = Object.assign({}, anObject)
    result[key] = value
    return result
  }
}
