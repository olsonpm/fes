export default (reducerFunction, start) => arrayLike =>
  Array.prototype.reduce.call(arrayLike, reducerFunction, start)
