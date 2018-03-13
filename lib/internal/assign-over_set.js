export default setThatGetsAssignedOver => primarySet =>
  new Set([...setThatGetsAssignedOver, ...primarySet])
