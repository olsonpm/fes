export default eachFunction => arrayLike => {
  for (let i = 0; i < arrayLike.length; i += 1) {
    eachFunction(arrayLike[i], i, arrayLike)
  }
  return arrayLike
}
