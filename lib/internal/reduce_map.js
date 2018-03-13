export default (reducerFunction, result) => aMap => {
  for (const [key, value] of aMap) {
    result = reducerFunction(result, value, key, aMap)
  }
  return result
}
