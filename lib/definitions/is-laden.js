import {
  isLaden_hasLength as arrayLike,
  isLaden_hasSize as mapOrSet,
  isLaden_object as object,
} from '../internal'

export default {
  name: 'isLaden',
  shouldThrowOnExtraDataArguments: false,
  typeToFunction: {
    any,
    arrayLike,
    mapOrSet,
    object,
  },
}

function any(something) {
  return !!(something && (something.length || something.size))
}
