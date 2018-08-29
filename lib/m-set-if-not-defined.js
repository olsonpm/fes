export default (obj, key, val) => {
  if (obj[key] === undefined) obj[key] = val
  return obj
}
