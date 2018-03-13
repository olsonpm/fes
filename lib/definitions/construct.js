export default {
  name: 'construct',
  expectedServiceArgumentTypes: ['function'],
  typeToFunction: { array },
}

//
//------------------//
// Helper Functions //
//------------------//

function array(constructorFunction) {
  return argumentsArray => new constructorFunction(...argumentsArray)
}
