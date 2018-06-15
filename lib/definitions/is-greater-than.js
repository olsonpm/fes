export default {
  name: 'isGreaterThan',
  expectedServiceArgumentTypes: ['number'],
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: {
    number: right => left => {
      return left > right
    },
  },
}
