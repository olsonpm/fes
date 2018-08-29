//---------//
// Imports //
//---------//

import tedent from 'tedent'

//
//------//
// Main //
//------//

const expected = {
  contrived: getExpectedContrived(),
  passThrough: getExpectedPassThrough(),
}

//
//------------------//
// Helper Functions //
//------------------//

function getExpectedContrived() {
  return {
    approveArguments: {
      first: 'aString is not correct',
      second: 'anObject.correct is not true',
    },
    invalidType: tedent(`
      'contrived' was passed one or more arguments with incorrect types
      Argument 2 has type 'string' but was supposed to have the type 'array'

      Argument 2 given: "invalid type"
    `),
    notEnoughArgs: tedent(`
      The function 'contrived' requires 3 arguments.
        You passed 2.

      Argument 0 given: "correct"

      Argument 1 given: {
        "correct": true
      }
    `),
  }
}

function getExpectedPassThrough() {
  return {
    invalidType: tedent(`
      'passThrough' was passed one or more arguments with incorrect types
      Argument 1 has type 'null' but was supposed to have the type 'array'

      Argument 1 given: null
    `),
    notEnoughArgs: tedent(`
      The function 'passThrough' requires 2 arguments.
        You passed 1.

      Argument 0 given: "a"
    `),
    tooManyArgs: tedent(`
      The function 'passThrough' requires 2 arguments.
        You passed 3.

      Argument 0 given: "a"

      Argument 1 given: [
        "<function toUpper>"
      ]

      Argument 2 given: "invalid"
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default expected
