import any from '../internal/flow'

export default {
  name: 'flow',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['array'],
  typeToFunction: { any },
}
