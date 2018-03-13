export default {
  name: 'mOmit',
  typeToDataDependentProps: {
    object: {
      expectedServiceArgumentTypes: [['number', 'string']],
      theFunction: mOmit_object,
    },
    map: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: mOmit_map,
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function mOmit_object(key) {
  return anObject => {
    delete anObject[key]
    return anObject
  }
}
function mOmit_map(key) {
  return aMap => {
    aMap.delete(key)
    return aMap
  }
}
