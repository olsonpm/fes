import assignOverRecursively from '../internal/assign-over-recursively'

export default {
  name: 'assignOverRecursively',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    object: {
      expectedServiceArgumentTypes: ['object'],
      theFunction: assignOverRecursively.object,
    },
    map: {
      expectedServiceArgumentTypes: ['map'],
      theFunction: assignOverRecursively.map,
    },
  },
}
