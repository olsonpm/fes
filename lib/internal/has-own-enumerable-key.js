export default key => something =>
  something != null &&
  typeof something === 'object' &&
  new Set(Object.keys(something)).has(key)
