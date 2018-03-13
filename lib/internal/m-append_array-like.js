//
// README
// - This file is not correct strictly speaking, as strings are both immutable
//   and 'array-like'.  This is thus a convenience method for declaring
//   array-like behavior for functions where mutability gives us speed gains
//   and strings must be handled alongside
//

export default value => arrayLike => {
  if (typeof arrayLike === 'string') return arrayLike + value

  Array.prototype.push.call(arrayLike, value)
  return arrayLike
}
