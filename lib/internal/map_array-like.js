import forEach from './for-each_array-like'

export default mapFunction => arrayLike => {
  const result = new Array(arrayLike.length)

  forEach((element, idx) => {
    result[idx] = mapFunction(element, idx, arrayLike)
  })(arrayLike)

  return result
}
