export default predicate => anArrayLike => {
  for (let i = 0; i < anArrayLike.length; i += 1) {
    const value = anArrayLike[i]
    if (predicate(value, i, anArrayLike)) return value
  }
}
