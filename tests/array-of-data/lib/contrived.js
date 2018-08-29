export default {
  name: 'contrived',
  isAsynchronous: true,
  isArrayOfData: true,
  transformResult: transformResult_set,
  typeToDataDependentProps: {
    array: {
      approveDataArgument: approve_array,
      theFunction: contrived_array,
      transformResult: transformResult_array,
    },
    set: {
      approveDataArgument: approve_set,
      theFunction: contrived_set,
    },
  },
}

function approve_array(arrayOfData) {
  const firstArray = arrayOfData[0]
  if (!(firstArray[0] === 1 && firstArray[1] === 2)) {
    return new Error("the first array isn't [1, 2]!")
  }
}

function approve_set(arrayOfData) {
  const firstSet = arrayOfData[0]
  if (!(firstSet.has(1) && firstSet.has(2))) {
    return new Error("the first set doesn't have 1 and 2!")
  }
}

function contrived_array(arrayOfData) {
  const result = arrayOfData.reduce((result, arrayOfNumbers) => {
    return result + sumArrayOfNumbers(arrayOfNumbers)
  }, 0)

  return Promise.resolve(result)
}

function contrived_set(arrayOfData) {
  const result = arrayOfData.reduce((result, setOfNumbers) => {
    return result + sumArrayOfNumbers([...setOfNumbers])
  }, 0)

  return Promise.resolve(result)
}

function sumArrayOfNumbers(arrayOfNumbers) {
  return arrayOfNumbers.reduce((result, number) => result + number, 0)
}

function transformResult_set(result) {
  return result + 1
}

function transformResult_array(result) {
  return result + 2
}
