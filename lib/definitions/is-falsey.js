export default {
  name: 'isFalsey',
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: { any: something => !something },
}
