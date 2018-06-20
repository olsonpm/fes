import reduceDefinition from './reduce'
import invoke from '../internal/invoke'

export default {
  name: 'reduceFresh',
  mergeDefinitionWith: reduceDefinition,
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['function', 'function'],
  transformServiceArguments: {
    1: invoke,
  },
}
