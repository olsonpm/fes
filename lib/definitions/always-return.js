import theFunction from '../internal/always-return'

export default {
  name: 'alwaysReturn',
  hasNoDataArgument: {
    expectedArgumentTypes: ['any'],
    theFunction,
  },
}
