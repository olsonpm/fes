export default {
  name: 'apply',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: [['array', 'arguments']],
  typeToFunction: { function: apply },
}

function apply(argumentsToApply) {
  return aFunction => aFunction(...argumentsToApply)
}
