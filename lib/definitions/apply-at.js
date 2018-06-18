//
// TODO: validate data argument to be anything besides undefined and null
//

export default {
  name: 'applyAt',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['string', ['array', 'arguments']],
  typeToFunction: { any: apply },
}

function apply(key, argumentsToApply) {
  return something => something[key](...argumentsToApply)
}
