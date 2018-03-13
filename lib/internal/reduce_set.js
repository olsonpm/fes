export default (reducerFunction, result) => aSet => {
  for (const value of aSet) {
    result = reducerFunction(result, value, value, aSet)
  }
  return result
}
