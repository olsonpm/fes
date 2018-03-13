const defaultInvokeAt = { theFunction: invokeAt_object }

export default {
  name: 'invokeAt',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: [['number', 'string']],
  typeToDataDependentProps: {
    arguments: defaultInvokeAt,
    array: defaultInvokeAt,
    map: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: invokeAt_map,
    },
    object: defaultInvokeAt,
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function invokeAt_object(key) {
  return anObject => anObject[key]()
}

function invokeAt_map(key) {
  return aMap => aMap.get(key)()
}
