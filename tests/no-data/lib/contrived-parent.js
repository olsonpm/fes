export default {
  name: 'contrivedParent',
  hasNoDataArgument: {
    expectedArgumentTypes: ['string', 'object', 'array'],
    theFunction: contrivedParent,
  },
}

function contrivedParent(aString, anObject, anArray) {
  return (
    aString === 'INCORRECT' &&
    anObject.correct === 'false' &&
    anArray[0] === 'INCORRECT'
  )
}
