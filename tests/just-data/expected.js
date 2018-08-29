//---------//
// Imports //
//---------//

import tedent from 'tedent'

//
//------//
// Main //
//------//

const expected = {
  contrived: makeContrived(),
  getCount: makeGetCount(),
}

//
//------------------//
// Helper Functions //
//------------------//

function makeContrived() {
  return {
    invalidArrayArg: "array is not ['a', 'b']!",
    invalidSetArg: "set does not contain 'A' and 'B'",
    invalidType: tedent(`
      The function 'contrived' was passed a data argument type of 'string'

      Allowed types: array, set

      Data argument passed: "invalid"
    `),
    notEnoughArgs: tedent(`
      A single data argument is required for 'contrived'
        You passed 0.
    `),
    tooManyArgs: tedent(`
      A single data argument is required for 'contrived'
        You passed 2.

      Argument 0 given: [
        "a",
        "b"
      ...

      Argument 1 given: "invalid"
    `),
  }
}

function makeGetCount() {
  return {
    invalidType: tedent(`
      The function 'getCount' was passed a data argument type of 'string'

      Allowed types: array, map, set

      Data argument passed: "invalid"
    `),
    notEnoughArgs: tedent(`
      A single data argument is required for 'getCount'
        You passed 0.
    `),
    tooManyArgs: tedent(`
      A single data argument is required for 'getCount'
        You passed 2.

      Argument 0 given: [
        "a"
      ]

      Argument 1 given: "invalid"
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default expected
