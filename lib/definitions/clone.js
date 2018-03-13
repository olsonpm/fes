import {
  clone_arguments,
  clone_array as allArrays,
  clone_date as date,
  clone_object as object,
} from '../internal'

export default {
  name: 'clone',
  typeToFunction: {
    allArrays,
    arguments: clone_arguments,
    buffer: aBuffer => Buffer.from(aBuffer),
    object,
    date,
    regExp,
    map: aMap => new Map(aMap),
    set: aSet => new Set(aSet),
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function regExp(aRegexp) {
  const clonedRegexp = new RegExp(aRegexp.source, aRegexp.flags)
  clonedRegexp.lastIndex = aRegexp.lastIndex
  return clonedRegexp
}
