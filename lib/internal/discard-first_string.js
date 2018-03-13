export default numberOfCharactersToDiscard => aString =>
  String.prototype.slice.call(aString, numberOfCharactersToDiscard)
