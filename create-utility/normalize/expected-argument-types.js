//
// README
//   - This is used both to validate support argument types as well as arguments
//     for utilities with no data argument (hence there's no reason to call them
//     'support arguments')
//

export default expectedArgumentTypes =>
  expectedArgumentTypes.map(oneOrManyTypes => {
    oneOrManyTypes = Array.isArray(oneOrManyTypes)
      ? oneOrManyTypes
      : [oneOrManyTypes]

    return new Set(oneOrManyTypes)
  })
