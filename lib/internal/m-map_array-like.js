import forEach from './for-each_array-like'

export default mapFunction => arrayLike => {
  forEach((element, idx) => {
    arrayLike[idx] = mapFunction(element, idx, arrayLike)
  })(arrayLike)

  return arrayLike
}
