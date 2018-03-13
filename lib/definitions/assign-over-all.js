import {
  construct_0arg as createEmpty,
  mAssignOver_map,
  mAssignOver_object,
  mAssignOver_set,
  reduce_arrayLike as reduce,
} from '../internal'

export default {
  name: 'assignOverAll',
  isArrayOfData: true,
  typeToFunction: {
    map: createAssignOverAll(mAssignOver_map, createEmpty(Map)),
    object: createAssignOverAll(mAssignOver_object, createEmpty(Object)),
    set: createAssignOverAll(mAssignOver_set, createEmpty(Set)),
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function createAssignOverAll(mAssign, createInitialResult) {
  return reduce(
    (result, element) => mAssign(result)(element),
    createInitialResult()
  )
}
