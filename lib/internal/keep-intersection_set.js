import reduce from './reduce_set'

export default set1 => set2 => {
  return reduce((result, set1Value) => {
    if (set2.has(set1Value)) result.add(set1Value)
    return result
  }, new Set())(set1)
}
