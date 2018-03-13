import construct_1arg from '../internal/construct_1arg'

export default {
  name: 'construct_1arg',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: { any: construct_1arg },
}
