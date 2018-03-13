export default shouldDiscard => arrayLike => {
  const result = []
  Array.prototype.forEach.call(arrayLike, (value, index) => {
    if (!shouldDiscard(value, index, arrayLike)) result.push(value)
  })
  return result
}
