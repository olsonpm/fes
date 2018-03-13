//
// TODO: decide whether this method belongs in this library.  It's not very
//   stable due to the fallback, but enforcing a finite number of constructors
//   also doesn't seem very useful.  hmmmm
//

//------//
// Init //
//------//

const constructorToCoerce = getConstructorToCoerce(),
  fallbackCoerce = (anything, aConstructorFunction) =>
    new aConstructorFunction(anything)

//
//------//
// Main //
//------//

export default {
  name: 'coerceTo',
  isDataFirst: true,
  shouldThrowOnExtraServiceArguments: false,
  expectedServiceArgumentTypes: ['any'],
  typeToFunction: {
    function: aConstructorFunction => anything => {
      const coerce = constructorToCoerce.has(aConstructorFunction)
        ? constructorToCoerce.get(aConstructorFunction)
        : fallbackCoerce

      return coerce(anything, aConstructorFunction)
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getConstructorToCoerce() {
  return new Map([
    [Boolean, anything => !!anything],
    [Array, anything => Array.from(anything)],
  ])
}
