export default (key, value) => anObject => {
  anObject[key] = value
  return anObject
}
