export default {
  name: 'isLessThan',
  expectedServiceArgumentTypes: ['number'],
  typeToFunction: {
    number: right => left => {
      return left < right
    },
  },
}
