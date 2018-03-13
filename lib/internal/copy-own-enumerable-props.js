//
// README
//  - I can't think of a good name for this file.  This function's purpose is to
//    take <something> which has own enumberable properties and copy them onto
//    <cloned something>.  This allows us to copy own enumerable properties
//    from/to e.g. a function
//

export default (originalSomething, clonedSomething) => {
  for (const key of Object.keys(originalSomething)) {
    clonedSomething[key] = originalSomething[key]
  }
  return clonedSomething
}
