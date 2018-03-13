//---------//
// Imports //
//---------//

import normalizeExpectedArgumentTypes from './expected-argument-types'
import normalizeHasNoDataArgument from './has-no-data-argument'
import normalizeTypeToDataDependentProps from './type-to-data-dependent-props'
import normalizeTypeToFunction from './type-to-function'
import assignOverRecursively from '../../../internal/assign-over-recursively'
import identity from '../../../internal/return-first-argument'
import noop from '../../../internal/noop'
import transformProperties from '../../../internal/transform-properties_object'

import { setIfNotDefined } from '../helpers'

//
//------//
// Main //
//------//

const normalizeDefinition = definition => {
  const { mergeDefinitionWith } = definition

  if (mergeDefinitionWith) {
    definition = recursivelyMergeDefinition(definition, mergeDefinitionWith)
  }

  const {
    flippedFrom,
    hasNoDataArgument,
    name,
    expectedServiceArgumentTypes = [],
    transformResult = identity,
    approveArguments = () => noop,
  } = definition

  Object.assign(definition, {
    approveArguments,
    transformResult,
    hasDataArgument: !hasNoDataArgument,
    hasServiceArguments: expectedServiceArgumentTypes.length !== 0,
  })

  if (definition.hasDataArgument) {
    setIfNotDefined(definition, 'shouldThrowOnExtraDataArguments', true)
  } else {
    delete definition.transformResult
  }

  if (definition.hasServiceArguments) {
    setIfNotDefined(definition, 'shouldThrowOnExtraServiceArguments', true)
  }

  if (flippedFrom) {
    Object.assign(definition, flippedFrom, { name })
    if (definition.isDataFirst) {
      throw new Error(
        "Don't flip utilities which are already data-first.  For sake of" +
          ' simplicity we should only be flipping data-last utilities'
      )
    }
    if (!definition.hasDataArgument) {
      throw new Error(
        'You must flip a utility which has a data argument.  Flipping means' +
          ' you flip the service and data arguments around e.g. ' +
          ' `getValueAt(key)(object)` vs `getValueFrom(object)(key)`'
      )
    }

    definition.isFlipped = true
    definition.isDataFirst = true
    delete definition.flippedFrom
  }

  return transformProperties({
    expectedServiceArgumentTypes: normalizeExpectedArgumentTypes,
    hasNoDataArgument: normalizeHasNoDataArgument,
    typeToDataDependentProps: normalizeTypeToDataDependentProps,
    typeToFunction: normalizeTypeToFunction,
  })(definition)
}

//
//------------------//
// Helper Functions //
//------------------//

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
