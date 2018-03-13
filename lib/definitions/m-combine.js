import mAssignOver from './m-assign-over'
import { canCombine_map, canCombine_object, canCombine_set } from '../internal'

export default {
  name: 'mCombine',
  mergeDefinitionWith: mAssignOver,
  typeToDataDependentProps: {
    map: {
      approveArguments: canCombine_map,
    },
    object: {
      approveArguments: canCombine_object,
    },
    set: {
      approveArguments: canCombine_set,
    },
  },
}
