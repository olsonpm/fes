export default numberOfElementsToDiscard => arrayLike =>
  arrayLike.slice(0, -numberOfElementsToDiscard)
