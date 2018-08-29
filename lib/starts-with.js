export default maybeStartsWith => fullString =>
  fullString.slice(0, maybeStartsWith.length) === maybeStartsWith
