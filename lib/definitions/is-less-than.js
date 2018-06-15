export default {
  name: 'isLessThan',
  expectedServiceArgumentTypes: ['number'],
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: {
    number: right => left => {
      return left < right
    },
  },
}
