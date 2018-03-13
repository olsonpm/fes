import {
  mAssignOver_map,
  mAssignOver_object,
  mAssignOver_set,
} from '../internal'

import assignOver from './assign-over'

export default {
  name: 'mAssignOver',
  mergeDefinitionWith: assignOver,
  typeToDataDependentProps: {
    object: {
      theFunction: mAssignOver_object,
    },
    map: {
      theFunction: mAssignOver_map,
    },
    set: {
      theFunction: mAssignOver_set,
    },
  },
}
