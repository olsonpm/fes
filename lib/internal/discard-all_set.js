import reduce from './reduce_set'

export default setOfValuesToRemove => fromASet =>
  reduce((result, value) => {
    if (!setOfValuesToRemove.has(value)) result.add(value)
    return result
  }, new Set())(fromASet)
