import containsAny from './contains-any_set'

export default setOfElementsToCheckFor => inThisArrayLike =>
  containsAny(setOfElementsToCheckFor)(new Set(inThisArrayLike))
