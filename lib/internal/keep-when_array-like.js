export default filterFunction => arrayLike =>
  Array.prototype.filter.call(arrayLike, filterFunction)
