import invoke from '../internal/invoke'

export default {
  name: 'invoke',
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: { function: invoke },
}
