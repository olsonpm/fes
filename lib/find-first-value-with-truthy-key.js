//
// README
//   - key and value refer to the first and second items of the pair.  Because
//     order is important to this function, an array *should* be used.
//

export default arrayOfPairs => {
  for (const [key, value] of arrayOfPairs) {
    if (key) return value
  }
}
