//---------//
// Imports //
//---------//

import tedent from 'tedent'

//
//------//
// Main //
//------//

const expected = {
  contrived: getContrivedExpected(),
  sumAll: getSumAllExpected(),
}

//
//------------------//
// Helper Functions //
//------------------//

function getContrivedExpected() {
  return {
    directCall: tedent(`
      'contrived' requires you specify the type such as 'contrived.arrays(...)'.

      Without specifying the type, fes can't return a reasonable value in the
      case of an empty list.

      Hint: you probably meant to call 'contrived.arrays(...)'
    `),
    directCallNoHint: tedent(`
      'contrived' requires you specify the type such as 'contrived.arrays(...)'.

      Without specifying the type, fes can't return a reasonable value in the
      case of an empty list.
    `),
    notEnougArgs: tedent(`
      A single data argument is required for 'contrived'
        You passed 0.
    `),
  }
}

function getSumAllExpected() {
  return {
    directCall: tedent(`
      'sumAll' requires you specify the type such as 'sumAll.arrays(...)'.

      Without specifying the type, fes can't return a reasonable value in the
      case of an empty list.

      Hint: you probably meant to call 'sumAll.arrays(...)'
    `),
    directCallNoHint: tedent(`
      'sumAll' requires you specify the type such as 'sumAll.arrays(...)'.

      Without specifying the type, fes can't return a reasonable value in the
      case of an empty list.
    `),
    invalidElementType: tedent(`
      The function 'sumAll.arrays' was passed at least one element of an incorrect type

      first invalid element
        type: set
        value: "Set { 1, 2 }"
    `),
    invalidType: tedent(`
      The function 'sumAll' was passed a data argument type of
        'string' but requires an array

      Data argument passed: "invalid"
    `),
    notEnougArgs: tedent(`
      A single data argument is required for 'sumAll'
        You passed 0.
    `),
    tooManyArgs: tedent(`
      A single data argument is required for 'sumAll'
        You passed 2.
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default expected
