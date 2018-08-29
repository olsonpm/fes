//---------//
// Imports //
//---------//

import groupToTypes from './group-to-types'

import { mSetIfNotDefined, reduce_object as reduce } from '../../../lib'

//
//------//
// Main //
//------//

const maybeNormalizeTypeToFunction = definition => {
  return definition.typeToDataDependentProps
    ? definition
    : maybeMixGroupToFunction(definition)
}

//
//------------------//
// Helper Functions //
//------------------//

function maybeMixGroupToFunction(definition) {
  const { groupToFunction, typeToFunction } = definition

  definition.typeToFunction = groupToFunction
    ? reduce(mixGroupIntoTypes, typeToFunction || {})(groupToFunction)
    : typeToFunction

  return definition
}

function mixGroupIntoTypes(typeToFunction, functionFromGroup, group) {
  const types = groupToTypes[group]
  return types.reduce(
    (result, aType) => mSetIfNotDefined(result, aType, functionFromGroup),
    typeToFunction
  )
}

//
//---------//
// Exports //
//---------//

export default maybeNormalizeTypeToFunction
