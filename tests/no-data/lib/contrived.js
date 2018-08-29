import contrivedParent from './contrived-parent'

export default {
  name: 'contrived',
  hasNoDataArgument: {
    approveArguments,
    isAsynchronous: true,
    mergeDefinitionWith: contrivedParent,
    shouldThrowOnExtraArguments: false,
    theFunction: contrived,
    transformArguments: getTransformArguments(),
    transformResult,
  },
}

function approveArguments(aString, anObject, anArray) {
  if (aString !== 'correct') return new Error('aString is not correct')
  if (anObject.correct !== true)
    return new Error('anObject.correct is not true')
  if (anArray[0] !== 'correct') return new Error('anArray[0] is not correct')
}

function contrived(aString, anObject, anArray) {
  return Promise.resolve(
    aString === 'CORRECT' &&
      anObject.correct === 'true' &&
      anArray[0] === 'CORRECT'
  )
}

function getTransformArguments() {
  return [
    toUpper,
    anObject => {
      anObject.correct = anObject.correct.toString()
      return anObject
    },
    anArray => {
      anArray[0] = anArray[0].toUpperCase()
      return anArray
    },
  ]
}

function toUpper(aString) {
  return aString.toUpperCase()
}

function transformResult(result) {
  return result.toString()
}
