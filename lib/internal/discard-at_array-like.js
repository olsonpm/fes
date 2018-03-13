export default idxToRemove => arrayLike =>
  Array.prototype.concat.call(
    Array.prototype.slice.call(arrayLike, 0, idxToRemove),
    Array.prototype.slice.call(arrayLike, idxToRemove + 1)
  )
