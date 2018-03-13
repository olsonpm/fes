export default {
  name: 'isGreaterThan',
  expectedServiceArgumentTypes: ['number'],
  typeToFunction: {
    number: right => left => {
      return left > right
    },
  },
}
