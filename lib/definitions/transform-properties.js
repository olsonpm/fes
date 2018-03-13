//
// TODO: validate service arguments to ensure values are functions
//

import transformProperties_object from '../internal/transform-properties_object'

export default {
  name: 'transformProperties',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    map: {
      expectedServiceArgumentTypes: ['map'],
      theFunction: transformProperties_map,
    },
    object: {
      expectedServiceArgumentTypes: ['object'],
      theFunction: transformProperties_object,
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function transformProperties_map(mapOfTransforms) {
  return aMap => {
    const result = new Map()

    for (const [key, value] of aMap) {
      if (mapOfTransforms.has(key)) {
        const transform = mapOfTransforms.get(key)
        result.set(key, transform(value, key, aMap))
      } else result.set(key, value)
    }

    return result
  }
}
