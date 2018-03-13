import hasKey_object from '../internal/has-key_object'

export default {
  name: 'hasKey',
  typeToDataDependentProps: {
    arrayLike: {
      expectedServiceArgumentTypes: [['number', 'string']],
      theFunction: hasKey_object,
    },
    map: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: hasKey_map,
    },
    object: {
      expectedServiceArgumentTypes: [['number', 'string']],
      theFunction: hasKey_object,
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function hasKey_map(key) {
  return aMap => aMap.has(key)
}
