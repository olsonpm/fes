export default aString => arrayLike =>
  Array.prototype.join.call(arrayLike, aString)
