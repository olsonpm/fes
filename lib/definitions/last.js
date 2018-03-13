export default {
  name: 'last',
  typeToFunction: {
    arrayLike: collection => collection[collection.length - 1],
  },
}
