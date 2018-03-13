import containsAll from './contains-all_set'

export default setOfElementsToCheckFor => inThisArrayLike =>
  containsAll(setOfElementsToCheckFor)(new Set(inThisArrayLike))
