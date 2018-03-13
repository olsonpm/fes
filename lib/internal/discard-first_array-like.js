export default numberOfElementsToDiscard => arrayLike =>
  Array.prototype.slice.call(arrayLike, numberOfElementsToDiscard)
