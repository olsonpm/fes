import identity from './identity'

export default transforms => anArray =>
  anArray.reduce((result, value, index) => {
    const transform = transforms[index] || identity

    result.push(transform(value, index, anArray))
    return result
  }, [])
