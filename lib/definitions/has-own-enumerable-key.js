import hasOwnEnumerableKey from '../internal/has-own-enumerable-key'

export default {
  name: 'hasOwnEnumerableKey',
  shouldThrowOnExtraDataArguments: false,
  expectedServiceArgumentTypes: ['string'],
  typeToFunction: {
    any: hasOwnEnumerableKey,
  },
}
