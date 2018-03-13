export default mapThatGetsAssignedOver => primaryMap =>
  new Map([...mapThatGetsAssignedOver, ...primaryMap])
