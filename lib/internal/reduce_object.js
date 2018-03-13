export default (reducerFunction, start) => anObject => {
  return Array.prototype.reduce.call(
    Object.keys(anObject),
    (result, key) => reducerFunction(result, anObject[key], key, anObject),
    start
  )
}
