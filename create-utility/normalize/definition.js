//
// TODO: split normalization into each of the utility types
//

//---------//
// Imports //
//---------//

import normalizeTypeProperties from './type-properties'
import normalizeHasNoDataArgument from './has-no-data-argument'

import { getHasDataArgument, getHasSupportArguments } from '../helpers'

import {
  assignOver_object as assignOver,
  assignOverRecursively,
  getValueAtPath,
  identity,
  noop,
  passThrough,
  transformProperties_array,
  transformProperties_object,
} from '../../lib'

//
//------//
// Init //
//------//

const combine = assignOver,
  applyDefaults = assignOver

//
//------//
// Main //
//------//

const normalizeDefinition = definition =>
  passThrough(definition, [
    handleFlippedFrom,
    maybeMergeDefinition,
    transformProperties_object({
      transformSupportArguments: transformProperties_array,
    }),
    applyDefaults({
      approveAllArguments: noop,
      approveSupportArguments: noop,
      expectedSupportArgumentTypes: [],
      transformResult: identity,
      transformSupportArguments: identity,
    }),
    combine({
      hasDataArgument: getHasDataArgument(definition),
      hasSupportArguments: getHasSupportArguments(definition),
    }),
    transformProperties_object({
      hasNoDataArgument: normalizeHasNoDataArgument,
    }),
    normalizeTypeProperties,
  ])

//
//------------------//
// Helper Functions //
//------------------//

function maybeMergeDefinition(definition) {
  const mergeDefinitionWith =
    definition.mergeDefinitionWith ||
    getValueAtPath(['hasNoDataArgument', 'mergeDefinitionWith'])(definition)

  return mergeDefinitionWith
    ? recursivelyMergeDefinition(definition, mergeDefinitionWith)
    : definition
}

function handleFlippedFrom(definition) {
  if (!definition.flippedFrom) return definition

  const { name } = definition
  Object.assign(definition, definition.flippedFrom, { name })
  definition.isFlipped = true
  delete definition.flippedFrom
  return definition
}

function recursivelyMergeDefinition(definition, definitionToMergeWith) {
  delete definition.mergeDefinitionWith
  definition = assignOverRecursively.object(definitionToMergeWith)(definition)

  return definition.mergeDefinitionWith
    ? recursivelyMergeDefinition(definition, definition.mergeDefinitionWith)
    : definition
}

//
//---------//
// Exports //
//---------//

export default normalizeDefinition
