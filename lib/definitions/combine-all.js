//---------//
// Imports //
//---------//

import {
  canCombine_map,
  canCombine_object,
  canCombine_set,
  construct_0arg as createEmpty,
  mAssignOver_map,
  mAssignOver_object,
  mAssignOver_set,
  reduce_arrayLike as reduce,
} from '../internal'

//
//------//
// Main //
//------//

export default {
  name: 'combineAll',
  isArrayOfData: true,
  typeToFunction: {
    map: createCombineAll(mAssignOver_map, canCombine_map, createEmpty(Map)),
    object: createCombineAll(
      mAssignOver_object,
      canCombine_object,
      createEmpty(Object)
    ),
    set: createCombineAll(mAssignOver_set, canCombine_set, createEmpty(Set)),
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function createCombineAll(mAssign, canCombine, createInitialResult) {
  return function combineAll(arrayOfData) {
    return reduce((result, element) => {
      //
      // it's cleaner to separate validation from application logic, however
      //   in this case it's unreasonable to iterate through all the elements
      //   while merging their keys just to determine up front whether the input
      //   is valid.  It makes much more sense to validate while we
      //   iterate through.
      //
      const error = canCombine(result)(element)
      if (error) throw error

      return mAssign(result)(element)
    }, createInitialResult())(arrayOfData)
  }
}
