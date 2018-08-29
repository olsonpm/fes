//
// TODO: performance test the difference between spreading the set into an array
//   then joining vs joining manually via `for of`
//
export default aString => aSet => [...aSet].join(aString)
