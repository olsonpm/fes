export default {
  name: 'appendAll',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['array'],
  typeToFunction: {
    array: appendAll,
  },
}

function appendAll(appendThese) {
  return toThis => toThis.concat(appendThese)
}
