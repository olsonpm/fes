//---------//
// Imports //
//---------//

import tedent from 'tedent'

//
//------//
// Main //
//------//

const expected = {
  contrived1: makeExpectedContrived1(),
  contrived2: makeExpectedContrived2(),
  getValueFrom: makeExpectedGetValueFrom(),
  keepFirst: makeExpectedKeepFirst(),
}

//
//------------------//
// Helper Functions //
//------------------//

function makeExpectedContrived2() {
  return {
    array: {
      invalidSupportArg: "support arg doesn't equal 'a'!",
      invalidSupportArgType: tedent(`
        'contrived2' was passed one or more support arguments with incorrect types
        Argument 0 has type 'number' but was supposed to have the type 'string'

        Argument 0 given: 1
      `),
    },
    string: {
      invalidSupportArg: "support arg doesn't equal 1!",
      invalidSupportArgType: tedent(`
        'contrived2' was passed one or more support arguments with incorrect types
        Argument 0 has type 'string' but was supposed to have the type 'number'

        Argument 0 given: "invalid"
      `),
    },
  }
}

function makeExpectedContrived1() {
  return {
    array: {
      invalidDataArg: "data arg doesn't have a length of 1!",
      invalidSupportArg: "support arg doesn't equal 'A'!",
      invalidSupportArgType: tedent(`
        'contrived1' was passed one or more support arguments with incorrect types
        Argument 0 has type 'number' but was supposed to have the type 'string'

        Argument 0 given: 1
      `),
    },
    set: {
      invalidDataArg: "data arg doesn't have a size of 1!",
      invalidSupportArg: "support arg doesn't equal 'a'!",
      invalidSupportArgType: tedent(`
        'contrived1' was passed one or more support arguments with incorrect types
        Argument 0 has type 'number' but was supposed to have the type 'string'

        Argument 0 given: 1
      `),
    },
    string: {
      invalidDataArg: "data arg doesn't equal 'A'!",
      invalidSupportArg: "support arg doesn't equal 1!",
      invalidSupportArgType: tedent(`
        'contrived1' was passed one or more support arguments with incorrect types
        Argument 0 has type 'string' but was supposed to have the type 'number'

        Argument 0 given: "invalid"
      `),
    },
  }
}

function makeExpectedGetValueFrom() {
  return {
    invalidSupportArgType: tedent(`
      'getValueFrom' was passed one or more support arguments with incorrect types
      Argument 0 has type 'null' but was supposed to have one of the following types: number, string

      Argument 0 given: null
    `),
    notEnoughDataArgs: tedent(`
      A single data argument is required for 'getValueFrom'
        You passed 0.
    `),
    tooManyDataArgs: tedent(`
      A single data argument is required for 'getValueFrom'
        You passed 2.

      Argument 0 given: {
        "a": "b"
      }

      Argument 1 given: "invalid"
    `),
  }
}

function makeExpectedKeepFirst() {
  return {
    invalidDataArgType: tedent(`
      The function 'keepFirst' was passed a data argument type of 'object'

      Allowed types: array, string

      Data argument passed: {}
    `),
    invalidSupportArgType: tedent(`
      'keepFirst' was passed one or more support arguments with incorrect types
      Argument 0 has type 'string' but was supposed to have the type 'number'

      Argument 0 given: "invalid"
    `),
    notEnoughDataArgs: tedent(`
      A single data argument is required for 'keepFirst'
        You passed 0.
    `),
    notEnoughSupportArgs: tedent(`
      The function 'keepFirst' requires 1 support argument.
        You passed 0.
    `),
    tooManySupportArgs: tedent(`
      The function 'keepFirst' requires 1 support argument.
        You passed 2.

      Argument 0 given: 2

      Argument 1 given: "invalid"
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default expected
