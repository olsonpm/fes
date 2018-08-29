export default {
  name: 'passThrough',
  hasNoDataArgument: {
    expectedArgumentTypes: ['any', 'array'],
    theFunction: passThrough,
  },
}

function passThrough(something, arrayOfFunctions) {
  return arrayOfFunctions.reduce(
    (result, aFunction) => aFunction(result),
    something
  )
}
