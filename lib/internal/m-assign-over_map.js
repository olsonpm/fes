export default mapThatGetsAssignedInto => primaryMap => {
  for (const [key, value] of primaryMap) {
    mapThatGetsAssignedInto.set(key, value)
  }
  return mapThatGetsAssignedInto
}
