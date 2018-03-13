export default numberOfElementsToDiscard => arrayLike =>
  Array.prototype.slice.call(arrayLike, 0, -numberOfElementsToDiscard)
