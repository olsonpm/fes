export default {
  name: 'applyAt',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['string', ['array', 'arguments']],
  typeToFunction: {
    array: apply,
    object: apply,
  },
}

function apply(key, argumentsToApply) {
  return anObject => anObject[key](...argumentsToApply)
}
