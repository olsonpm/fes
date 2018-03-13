export default {
  name: 'getArrayOfKeys',
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: {
    map: aMap => [...aMap.keys()],
    object: Object.keys,
  },
}
