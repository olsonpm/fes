export default numberOfElementsToKeep => arrayLike =>
  Array.prototype.slice.call(arrayLike, 0, numberOfElementsToKeep)
