export default setThatGetsAssignedInto => primarySet => {
  for (const value of primarySet) {
    setThatGetsAssignedInto.add(value)
  }
  return setThatGetsAssignedInto
}
