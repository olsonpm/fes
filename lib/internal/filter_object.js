import reduce from './reduce_object'

export default predicate =>
  reduce((result, value, key, anObject) => {
    if (predicate(value, key, anObject)) result[key] = value

    return result
  }, {})
