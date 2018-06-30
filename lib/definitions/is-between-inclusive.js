export default {
  name: 'isBetweenInclusive',
  expectedServiceArgumentTypes: ['number', 'number'],
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: {
    number: (min, max) => aNumber => {
      return aNumber >= min && aNumber <= max
    },
  },
}
