//
// README
//  - I wanted to keep the simple test simple which is why this utility doesn't
//    make sense.  I don't have many use-cases for 'array-of-data' utilities,
//    but assignOverAll and combineAll are two I rely on heavily.  I also
//    foresee creating more in the future.
//

export default {
  name: 'sumAll',
  isArrayOfData: true,
  typeToFunction: {
    array: sum_array,
    set: sum_set,
  },
}

function sum_array(arrayOfData) {
  return arrayOfData.reduce((result, arrayOfNumbers) => {
    return result + sumArrayOfNumbers(arrayOfNumbers)
  }, 0)
}

function sum_set(arrayOfData) {
  return arrayOfData.reduce((result, setOfNumbers) => {
    return result + sumArrayOfNumbers([...setOfNumbers])
  }, 0)
}

function sumArrayOfNumbers(arrayOfNumbers) {
  return arrayOfNumbers.reduce((result, number) => result + number, 0)
}
