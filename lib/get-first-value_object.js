export default anObject => {
  const firstKey = Object.keys(anObject)[0]
  return anObject[firstKey]
}
