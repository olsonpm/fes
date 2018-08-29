//---------//
// Imports //
//---------//

import { setOfTypedArrayTypes } from '../../helpers'

//
//------//
// Main //
//------//

export default {
  allArrays: ['array', ...setOfTypedArrayTypes],
  arrayLike: [
    'arguments',
    'array',
    'htmlCollection',
    'string',
    ...setOfTypedArrayTypes,
  ],
  mapOrSet: ['map', 'set'],
  typedArray: [...setOfTypedArrayTypes],
}
