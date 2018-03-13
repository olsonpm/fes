import { assignOver_map, assignOver_object, assignOver_set } from '../internal'

export default {
  name: 'assignOver',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    object: {
      expectedServiceArgumentTypes: ['object'],
      theFunction: assignOver_object,
    },
    map: {
      expectedServiceArgumentTypes: ['map'],
      theFunction: assignOver_map,
    },
    set: {
      expectedServiceArgumentTypes: ['set'],
      theFunction: assignOver_set,
    },
  },
}
