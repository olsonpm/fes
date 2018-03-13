import theFunction from '../internal/pass-through'

export default {
  name: 'passThrough',
  hasNoDataArgument: {
    expectedArgumentTypes: ['any', 'array'],
    theFunction,
  },
}
