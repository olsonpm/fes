import { mSet_map, mSet_object } from '../internal'

export default {
  name: 'mSet',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    object: {
      expectedServiceArgumentTypes: ['string', 'any'],
      theFunction: mSet_object,
    },
    map: {
      expectedServiceArgumentTypes: ['any', 'any'],
      theFunction: mSet_map,
    },
  },
}
