import reduce from './reduce_set'

export default array1 => array2 => {
  const setOfArray1Values = new Set(array1),
    setOfArray2Values = new Set(array2)

  return reduce((result, array1value) => {
    if (setOfArray2Values.has(array1value)) result.push(array1value)
    return result
  }, [])(setOfArray1Values)
}
