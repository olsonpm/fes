import getValueAt_object from '../internal/get-value-at_object'

export default {
  name: 'getValueAt',
  shouldThrowOnExtraDataArguments: false,
  typeToDataDependentProps: {
    arrayLike: {
      expectedServiceArgumentTypes: [['number', 'string']],
      theFunction: getValueAt_object,
    },
    map: {
      expectedServiceArgumentTypes: ['any'],
      theFunction: key => aMap => aMap.get(key),
    },
    object: {
      expectedServiceArgumentTypes: [['number', 'string']],
      theFunction: getValueAt_object,
    },
  },
}
