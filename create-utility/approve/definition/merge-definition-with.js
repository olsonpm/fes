//------//
// Main //
//------//

const approveMergeDefinitionWith = (definition, arg) => {
  const { mergeDefinitionWith, name } = definition
  if (!mergeDefinitionWith) return

  const { approveDefinition, chain } = arg

  chain.push(`${name} mergeDefinitionWith`)
  const maybeInvalidMerge = approveDefinition(mergeDefinitionWith, { chain })
  chain.pop()

  if (maybeInvalidMerge) return maybeInvalidMerge
}

//
//---------//
// Exports //
//---------//

export default approveMergeDefinitionWith
