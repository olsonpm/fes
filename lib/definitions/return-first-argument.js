import theFunction from '../internal/return-first-argument'

//
// also called the 'identity function'
// https://en.wikipedia.org/wiki/Identity_function
//
export default {
  name: 'returnFirstArgument',
  hasNoDataArgument: {
    expectedArgumentTypes: ['any'],
    shouldThrowOnExtraArguments: false,
    theFunction,
  },
}
