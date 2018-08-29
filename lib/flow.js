export default functionArray => arg =>
  functionArray.reduce((result, aFunction) => aFunction(result), arg)
