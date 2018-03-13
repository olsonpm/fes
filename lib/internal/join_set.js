export default aString => aSet => {
  if (!aSet.size) return ''

  const iterator = aSet.values()
  let { value } = iterator.next(),
    result = `${value}`

  for (value of iterator) {
    result += `${aString}${value}`
  }

  return result
}
