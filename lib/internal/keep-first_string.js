export default numberOfCharactersToKeep => aString =>
  String.prototype.slice.call(aString, 0, numberOfCharactersToKeep)
