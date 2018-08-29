export default (reducerFunction, start) => anObject => {
  return Object.keys(anObject).reduce(
    (result, key) => reducerFunction(result, anObject[key], key, anObject),
    start
  )
}
