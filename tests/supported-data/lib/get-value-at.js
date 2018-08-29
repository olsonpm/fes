export default {
  name: 'getValueAt',
  typeToDataDependentProps: {
    map: {
      expectedSupportArgumentTypes: ['any'],
      theFunction: getValueAt_map,
    },
    object: {
      expectedSupportArgumentTypes: [['number', 'string']],
      theFunction: getValueAt_object,
    },
  },
}

function getValueAt_object(key) {
  return anObject => anObject[key]
}

function getValueAt_map(key) {
  return aMap => aMap.get(key)
}
