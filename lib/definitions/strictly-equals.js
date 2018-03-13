import strictlyEquals from '../internal/strictly-equals'

export default {
  name: 'strictlyEquals',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['any'],
  typeToFunction: { any: strictlyEquals },
}
